import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';
import { getFileLink } from '@src/bot';
import {
  handleUnexpectedText,
  CHAT_ACTION_DURATION_IN_SECONDS,
  MILLISECONDS_IN_SECOND,
  NANOSECONDS_IN_SECOND,
} from '@src/scenes';

export const addCarDocsPhotoScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddCarDocsPhoto
);

addCarDocsPhotoScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addCarDocsPhotoNote, Markup.removeKeyboard())
);

addCarDocsPhotoScene.on('photo', async (ctx: IBotContext) => {
  const { carDocsPhotoUrls, setCarDocsPhotoUrls, isFilledOrder, userChatId } =
    ctx.session.state.orderModule;

  const {
    setLoadCarDocsPhotoStartTime,
    loadCarDocsPhotoStartTime,
    setCarDocsPhotoLoadingStatus,
  } = ctx.session.state.scenesModule;

  setLoadCarDocsPhotoStartTime(process.hrtime.bigint());

  if (ctx.message !== undefined && 'photo' in ctx.message) {
    const largePhotoID =
      ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const fileData = await getFileLink(largePhotoID);

    setCarDocsPhotoUrls([...carDocsPhotoUrls, fileData.href]);
  }

  setTimeout(async () => {
    const { isExpiredCarDocsPhotoLoading } = ctx.session.state.scenesModule;

    const loadCarDocsPhotoEndTime = process.hrtime.bigint();

    const loadPhotoDurationWithTimeout = Number(
      loadCarDocsPhotoEndTime - loadCarDocsPhotoStartTime
    );

    if (
      loadPhotoDurationWithTimeout >
        CHAT_ACTION_DURATION_IN_SECONDS * NANOSECONDS_IN_SECOND &&
      !isExpiredCarDocsPhotoLoading
    ) {
      setCarDocsPhotoLoadingStatus(true);

      await ctx.scene.enter(
        isFilledOrder
          ? ScenesNames.OrderConfirmation
          : ScenesNames.ChooseOrderQuality
      );
    }
  }, CHAT_ACTION_DURATION_IN_SECONDS * MILLISECONDS_IN_SECOND);

  await ctx.telegram.sendChatAction(userChatId, 'typing');
});

addCarDocsPhotoScene.on('text', (ctx: IBotContext) => {
  const { isExpiredCarDocsPhotoLoading } = ctx.session.state.scenesModule;

  const { carDocsPhotoUrls } = ctx.session.state.orderModule;

  handleUnexpectedText(
    ctx,
    !isExpiredCarDocsPhotoLoading && carDocsPhotoUrls?.length === 0
      ? 'chooseFile'
      : 'waitingBot'
  );
});

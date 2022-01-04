import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';
import { getFileLink } from '@src/bot';
import {
  handleUnexpectedText,
  CHAT_ACTION_DURATION_IN_SECONDS,
  MILLISECONDS_IN_SECOND,
  NANOSECONDS_IN_SECOND,
  switchScene,
} from '@src/scenes';

export const addOrderPhotoDescriptionScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddOrderPhotoDescription
);

addOrderPhotoDescriptionScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addPhotoDescriptionNote, Markup.removeKeyboard())
);

addOrderPhotoDescriptionScene.on('photo', async (ctx: IBotContext) => {
  const {
    setLoadOrderPhotoStartTime,
    loadOrderPhotoStartTime,
    setOrderPhotoLoadingStatus,
  } = ctx.session.state.scenesModule;

  const { orderPhotoUrls, setOrderPhotoUrls, isFilledOrder, userChatId } =
    ctx.session.state.orderModule;

  setLoadOrderPhotoStartTime(process.hrtime.bigint());

  if (ctx.message !== undefined && 'photo' in ctx.message) {
    const largePhotoID =
      ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const fileData = await getFileLink(largePhotoID);

    setOrderPhotoUrls([...orderPhotoUrls, fileData.href]);

    setTimeout(async () => {
      const { isExpiredOrderPhotoLoading } = ctx.session.state.scenesModule;

      const loadOrderPhotoEndTime = process.hrtime.bigint();

      const loadPhotoDurationWithTimeout = Number(
        loadOrderPhotoEndTime - loadOrderPhotoStartTime
      );

      if (
        loadPhotoDurationWithTimeout >
          CHAT_ACTION_DURATION_IN_SECONDS * NANOSECONDS_IN_SECOND &&
        !isExpiredOrderPhotoLoading
      ) {
        setOrderPhotoLoadingStatus(true);

        await switchScene(
          ctx,
          isFilledOrder
            ? ScenesNames.OrderConfirmation
            : ScenesNames.ChooseDeliveryType
        );
      }
    }, CHAT_ACTION_DURATION_IN_SECONDS * MILLISECONDS_IN_SECOND);

    await ctx.telegram.sendChatAction(userChatId, 'typing');
  }
});

addOrderPhotoDescriptionScene.on('text', (ctx: IBotContext) => {
  const { isExpiredOrderPhotoLoading } = ctx.session.state.scenesModule;

  const { orderPhotoUrls } = ctx.session.state.orderModule;

  handleUnexpectedText(
    ctx,
    !isExpiredOrderPhotoLoading && orderPhotoUrls?.length === 0
      ? 'chooseFile'
      : 'waitingBot'
  );
});

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
import { hasFilledField } from '@src/services';

export const addCarDocsPhotoScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddCarDocsPhoto
);

addCarDocsPhotoScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addCarDocsPhotoNote, Markup.removeKeyboard())
);

addCarDocsPhotoScene.on('photo', async (ctx: IBotContext) => {
  const { state } = ctx.session;

  state.startLoadCarDocsPhotoTime = process.hrtime.bigint();

  if (ctx.message !== undefined && 'photo' in ctx.message) {
    const largePhotoID =
      ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const fileData = await getFileLink(largePhotoID);

    state.carDocsPhotoUrls.push(fileData.href);
  }

  setTimeout(async () => {
    const stopLoadCarDocsPhotoTime = process.hrtime.bigint();

    const loadPhotoDurationWithTimeout = Number(
      stopLoadCarDocsPhotoTime - state.startLoadCarDocsPhotoTime
    );

    if (
      loadPhotoDurationWithTimeout >
        CHAT_ACTION_DURATION_IN_SECONDS * NANOSECONDS_IN_SECOND &&
      (!state.hasShowChooseOrderQualitySceneAction || state.hasFilledOrder)
    ) {
      state.hasShowChooseOrderQualitySceneAction = true;

      await ctx.scene.enter(
        state.hasFilledOrder
          ? ScenesNames.OrderConfirmation
          : ScenesNames.ChooseOrderQuality
      );
    }
  }, CHAT_ACTION_DURATION_IN_SECONDS * MILLISECONDS_IN_SECOND);

  await ctx.telegram.sendChatAction(state.userChatId, 'typing');
});

addCarDocsPhotoScene.on('text', (ctx: IBotContext) => {
  const { state } = ctx.session;

  handleUnexpectedText(
    ctx,
    !state.hasShowChooseOrderQualitySceneAction &&
      !hasFilledField('carDocsPhotoUrls', state)
      ? 'chooseFile'
      : 'waitingBot'
  );
});

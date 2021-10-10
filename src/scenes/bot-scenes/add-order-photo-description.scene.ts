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

export const addOrderPhotoDescriptionScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddOrderPhotoDescription
);

addOrderPhotoDescriptionScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addPhotoDescriptionNote, Markup.removeKeyboard())
);

addOrderPhotoDescriptionScene.on('photo', async (ctx: IBotContext) => {
  const { state } = ctx.session;

  state.startLoadPhotoDescriptionTime = process.hrtime.bigint();

  if (ctx.message !== undefined && 'photo' in ctx.message) {
    const largePhotoID =
      ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const fileData = await getFileLink(largePhotoID);

    state.orderPhotoUrls.push(fileData.href);

    setTimeout(async () => {
      const stopLoadPhotoDescriptionTime = process.hrtime.bigint();

      const loadPhotoDurationWithTimeout = Number(
        stopLoadPhotoDescriptionTime - state.startLoadPhotoDescriptionTime
      );

      if (
        loadPhotoDurationWithTimeout >
          CHAT_ACTION_DURATION_IN_SECONDS * NANOSECONDS_IN_SECOND &&
        (!state.hasShowChooseDeliveryTypeSceneAction || state.hasFilledOrder)
      ) {
        state.hasShowChooseDeliveryTypeSceneAction = true;

        await ctx.scene.enter(
          state.hasFilledOrder
            ? ScenesNames.OrderConfirmation
            : ScenesNames.ChooseDeliveryType
        );
      }
    }, CHAT_ACTION_DURATION_IN_SECONDS * MILLISECONDS_IN_SECOND);

    await ctx.telegram.sendChatAction(state.userChatId, 'typing');
  }
});

addOrderPhotoDescriptionScene.on('text', (ctx: IBotContext) => {
  const { state } = ctx.session;

  handleUnexpectedText(
    ctx,
    !state.hasShowChooseDeliveryTypeSceneAction &&
      !hasFilledField('orderPhotoUrls', state)
      ? 'chooseFile'
      : 'waitingBot'
  );
});

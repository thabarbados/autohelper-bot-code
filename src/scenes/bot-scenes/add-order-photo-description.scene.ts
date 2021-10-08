import { Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';
import { getFileLink } from '@src/bot';
import { handleUnexpectedText } from '@src/scenes';

export const addOrderPhotoDescriptionScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddOrderPhotoDescription
);

addOrderPhotoDescriptionScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addPhotoDescriptionNote)
);

addOrderPhotoDescriptionScene.on('photo', async (ctx: IBotContext) => {
  const { state } = ctx.session;

  if (ctx.message !== undefined && 'photo' in ctx.message) {
    const largePhotoID =
      ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const fileData = await getFileLink(largePhotoID);

    state.orderPhotoUrl = fileData.href;
  }

  return ctx.scene.enter(
    state.hasFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseDeliveryType
  );
});

addOrderPhotoDescriptionScene.on('text', (ctx: IBotContext) =>
  handleUnexpectedText(ctx)
);

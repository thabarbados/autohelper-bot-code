import { Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';
import { getFileLink } from '@src/bot';
import { handleUnexpectedText } from '@src/scenes';

export const addCarDocsPhotoScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddCarDocsPhoto
);

addCarDocsPhotoScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addCarDocsPhotoNote)
);

addCarDocsPhotoScene.on('photo', async (ctx: IBotContext) => {
  const { state } = ctx.session;

  if (ctx.message !== undefined && 'photo' in ctx.message) {
    const largePhotoID =
      ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const fileData = await getFileLink(largePhotoID);

    state.carDocsPhotoUrl = fileData.href;
  }

  return ctx.scene.enter(
    state.hasFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseOrderQuality
  );
});

addCarDocsPhotoScene.on('text', (ctx: IBotContext) =>
  handleUnexpectedText(ctx)
);

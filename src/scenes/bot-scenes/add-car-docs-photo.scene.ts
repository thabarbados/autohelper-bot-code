import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '../../configs';
import { IBotContext } from '../../domain';
import { getFileLink } from '../../bot';

export const addCarDocsPhotoScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddCarDocsPhoto
);

addCarDocsPhotoScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addCarDocsPhotoNote)
);

addCarDocsPhotoScene.on('photo', async (ctx: IBotContext) => {
  if (ctx.message !== undefined && 'photo' in ctx.message) {
    const largePhotoID =
      ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const fileData = await getFileLink(largePhotoID);

    ctx.session.state.autoDocPhotoUrl = fileData.href;
  }

  return ctx.scene.enter(ScenesNames.ChooseOrderQuality);
});

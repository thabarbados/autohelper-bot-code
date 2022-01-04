import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';
import { switchScene } from '@src/scenes';
import { getFileLink } from '@src/bot';

export const addClientMessageDataScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddClientMessageData
);

addClientMessageDataScene.enter((ctx: IBotContext) => {
  ctx.reply(botTexts.addClientMessageDataNotice, Markup.removeKeyboard());
});

addClientMessageDataScene.on('text', async (ctx: IBotContext) => {
  const { setMessageText } = ctx.session.admin;

  if (ctx.message !== undefined && 'text' in ctx.message) {
    setMessageText(ctx.message.text);
  }

  await switchScene(ctx, ScenesNames.ClientMessageConfirmation);
});

addClientMessageDataScene.on('photo', async (ctx: IBotContext) => {
  const { setMessagePhotoUrls, messagePhotoUrls } = ctx.session.admin;

  if (ctx.message !== undefined && 'photo' in ctx.message) {
    const largePhotoID =
      ctx.message.photo[ctx.message.photo.length - 1].file_id;

    const fileData = await getFileLink(largePhotoID);

    setMessagePhotoUrls([...messagePhotoUrls, fileData.href]);
  }

  await switchScene(ctx, ScenesNames.ClientMessageConfirmation);
});

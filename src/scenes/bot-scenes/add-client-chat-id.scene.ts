import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';
import { AdminModule } from '@src/store';
import { switchScene } from '@src/scenes';

export const addClientChatIdScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddClientChatId
);

addClientChatIdScene.enter((ctx: IBotContext) => {
  ctx.session.admin = new AdminModule();

  ctx.reply(botTexts.addClientChatIdNotice, Markup.removeKeyboard());
});

addClientChatIdScene.on('text', async (ctx: IBotContext) => {
  const { setClientChatId } = ctx.session.admin;

  if (ctx.message !== undefined && 'text' in ctx.message) {
    setClientChatId(ctx.message.text);
  }

  await switchScene(ctx, ScenesNames.AddClientMessageData);
});

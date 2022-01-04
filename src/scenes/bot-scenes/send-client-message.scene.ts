import { Markup, Scenes } from 'telegraf';

import {
  botTexts,
  ScenesNames,
} from '@src/configs';
import { IBotContext } from '@src/domain';
import { sendPhotoToChat } from '@src/scenes';

export const sendClientMessageScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.SendClientMessage
);

sendClientMessageScene.enter(async (ctx: IBotContext) => {
  const { clientChatId, messagePhotoUrls, messageText } = ctx.session.admin;

  if (messageText.length > 0) {
    await ctx.telegram.sendMessage(clientChatId, messageText, {
      parse_mode: 'HTML',
    });
  } else {
    await sendPhotoToChat(ctx, clientChatId, messagePhotoUrls, '');
  }

  ctx.reply(botTexts.sendClientMessageNotice, Markup.removeKeyboard());
});

import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames, VT_CHAT_ID } from '@src/configs';
import { IBotContext } from '@src/domain';
import { getOrderText } from '@src/services';
import { sendPhotoToChat } from '@src/scenes';

export const createOrderScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.CreateOrder
);

createOrderScene.enter(async (ctx: IBotContext) => {
  await ctx.reply(botTexts.createOrderNotice, Markup.removeKeyboard());

  const chatIds = [VT_CHAT_ID];

  const orderMessage = getOrderText(ctx.session.state);

  for (const id of chatIds) {
    await ctx.telegram.sendMessage(id, orderMessage, { parse_mode: 'HTML' });

    if (ctx.session.state.orderPhotoUrl.length > 0) {
      await sendPhotoToChat(
        ctx,
        id,
        ctx.session.state.orderPhotoUrl,
        botTexts.orderPhotoCaption
      );
    }

    if (ctx.session.state.autoDocPhotoUrl.length > 0) {
      await sendPhotoToChat(
        ctx,
        id,
        ctx.session.state.autoDocPhotoUrl,
        botTexts.orderCarDocsPhotoCaption
      );
    }
  }

  return;
});

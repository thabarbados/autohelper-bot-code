import { Scenes } from 'telegraf';

import { botTexts, ScenesNames, VT_CHAT_ID } from '../../configs';
import { IBotContext } from '../../domain';
import { getOrderText } from '../../services';

export const createOrderScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.CreateOrder
);

createOrderScene.enter(async (ctx: IBotContext) => {
  await ctx.reply(botTexts.createOrderNotice);

  const chatIds = [VT_CHAT_ID];

  const orderMessage = getOrderText(ctx.session.state);

  for (const id of chatIds) {
    await ctx.telegram.sendMessage(id, orderMessage, { parse_mode: 'HTML' });

    if (ctx.session.state.orderPhotoUrl.length > 0) {
      await ctx.telegram.sendPhoto(
        id,
        {
          url: ctx.session.state.orderPhotoUrl,
        },
        { caption: botTexts.orderPhotoCaption }
      );
    }

    if (ctx.session.state.autoDocPhotoUrl.length > 0) {
      await ctx.telegram.sendPhoto(
        id,
        {
          url: ctx.session.state.autoDocPhotoUrl,
        },
        {
          caption: botTexts.orderCarDocsPhotoCaption,
        }
      );
    }
  }

  return;
});

import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames, VT_CHAT_ID } from '@src/configs';
import { IBotContext } from '@src/domain';
import { getOrderText, hasFilledField } from '@src/services';
import { sendPhotoToChat } from '@src/scenes';

export const createOrderScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.CreateOrder
);

createOrderScene.enter(async (ctx: IBotContext) => {
  const { state } = ctx.session;

  await ctx.reply(botTexts.createOrderNotice, Markup.removeKeyboard());

  const chatIds = [VT_CHAT_ID];

  const orderMessage = getOrderText(state, true);

  for (const id of chatIds) {
    await ctx.telegram.sendMessage(id, orderMessage, { parse_mode: 'HTML' });

    if (hasFilledField('orderPhotoUrls', state)) {
      await sendPhotoToChat(
        ctx,
        id,
        state.orderPhotoUrls,
        botTexts.orderPhotoCaption
      );
    }

    if (hasFilledField('carDocsPhotoUrls', state)) {
      await sendPhotoToChat(
        ctx,
        id,
        state.carDocsPhotoUrls,
        botTexts.orderCarDocsPhotoCaption
      );
    }
  }

  return;
});

import { Markup, Scenes } from 'telegraf';

import {
  botTexts,
  ScenesNames,
  VT_CHAT_ID,
  // AD_CHAT_ID,
  // AC_CHAT_ID,
} from '@src/configs';
import { IBotContext } from '@src/domain';
import { getOrderText } from '@src/services';
import { sendPhotoToChat, switchScene } from '@src/scenes';

export const createOrderScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.CreateOrder
);

createOrderScene.enter(async (ctx: IBotContext) => {
  const { orderPhotoUrls, carDocsPhotoUrls, isMultipleOrder } =
    ctx.session.state.orderModule;

  await ctx.reply(botTexts.createOrderNotice, Markup.removeKeyboard());

  const chatIds = [VT_CHAT_ID];

  const orderMessage = getOrderText(
    ctx.session.state.orderModule,
    'textWithUserInfo'
  );

  for (const id of chatIds) {
    await ctx.telegram.sendMessage(id, orderMessage, { parse_mode: 'HTML' });

    if (orderPhotoUrls?.length > 0) {
      await sendPhotoToChat(
        ctx,
        id,
        orderPhotoUrls,
        botTexts.orderPhotoCaption
      );
    }

    if (carDocsPhotoUrls?.length > 0) {
      await sendPhotoToChat(
        ctx,
        id,
        carDocsPhotoUrls,
        botTexts.orderCarDocsPhotoCaption
      );
    }
  }

  if (isMultipleOrder) {
    switchScene(ctx, ScenesNames.StartNextOrder);
  }
});

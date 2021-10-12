import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames, buttonsValue } from '@src/configs';
import { IBotContext } from '@src/domain';
import { getOrderText } from '@src/services';
import { handleUnexpectedText } from '@src/scenes';

export const orderConfirmationScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.OrderConfirmation
);

orderConfirmationScene.enter(async (ctx: IBotContext) => {
  const {
    orderPhotoUrls,
    carDocsPhotoUrls,
    deliveryAddress,
    orderTextDescription,
    carVinNumber,
  } = ctx.session.state.orderModule;

  const orderMessage = getOrderText(
    ctx.session.state.orderModule,
    'defaultText'
  );

  await ctx.reply(botTexts.confirmOrderTitle, Markup.removeKeyboard());
  await ctx.reply(orderMessage, { parse_mode: 'HTML' });

  for (const orderPhotoUrl of orderPhotoUrls) {
    await ctx.replyWithPhoto(
      { url: orderPhotoUrl },
      { caption: botTexts.orderPhotoCaption }
    );
  }

  for (const carDocsPhotoUrl of carDocsPhotoUrls) {
    await ctx.replyWithPhoto(
      { url: carDocsPhotoUrl },
      { caption: botTexts.orderCarDocsPhotoCaption }
    );
  }

  const deliveryDataButtons = [buttonsValue.changeDeliveryTypeBtn];
  if (deliveryAddress?.length > 0) {
    deliveryDataButtons.push(buttonsValue.changeDeliveryAddressBtn);
  }

  await ctx.reply(
    botTexts.confirmOrderNotice,
    Markup.keyboard([
      [buttonsValue.confirmOrderBtn],
      [
        orderTextDescription?.length > 0
          ? buttonsValue.changeOrderDescriptionBtn
          : buttonsValue.changeOrderPhotoBtn,
        carDocsPhotoUrls?.length > 0
          ? buttonsValue.changeCarDocsPhotoBtn
          : carVinNumber?.length > 0
          ? buttonsValue.changeCarVinNumberBtn
          : buttonsValue.changeCarDescriptionBtn,
      ],
      [...deliveryDataButtons],
      [buttonsValue.changeOrderQuality, buttonsValue.changeOrderUrgency],
    ])
      .oneTime()
      .resize()
  );
});

orderConfirmationScene.on('text', (ctx: IBotContext) =>
  handleUnexpectedText(ctx, 'buttons')
);

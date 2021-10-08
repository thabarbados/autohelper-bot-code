import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames, buttonsValue } from '@src/configs';
import { IBotContext } from '@src/domain';
import { getOrderText, hasFilledField } from '@src/services';
import { handleUnexpectedText } from '@src/scenes';

export const orderConfirmationScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.OrderConfirmation
);

orderConfirmationScene.enter(async (ctx: IBotContext) => {
  const { state } = ctx.session;

  const orderMessage = getOrderText(state, false);
  await ctx.reply(botTexts.confirmOrderTitle, Markup.removeKeyboard());
  await ctx.reply(orderMessage, { parse_mode: 'HTML' });

  if (hasFilledField('orderPhoto', state)) {
    await ctx.replyWithPhoto(
      { url: state.orderPhotoUrl },
      { caption: botTexts.orderPhotoCaption }
    );
  }

  if (hasFilledField('carDocsPhoto', state)) {
    await ctx.replyWithPhoto(
      { url: state.carDocsPhotoUrl },
      { caption: botTexts.orderCarDocsPhotoCaption }
    );
  }

  const deliveryDataButtons = [buttonsValue.changeDeliveryTypeBtn];
  if (hasFilledField('deliveryAddress', state)) {
    deliveryDataButtons.push(buttonsValue.changeDeliveryAddressBtn);
  }

  await ctx.reply(
    botTexts.confirmOrderNotice,
    Markup.keyboard([
      [buttonsValue.confirmOrderBtn],
      [
        hasFilledField('orderTextDescription', state)
          ? buttonsValue.changeOrderDescriptionBtn
          : buttonsValue.changeOrderPhotoBtn,
        hasFilledField('carDocsPhoto', state)
          ? buttonsValue.changeCarDocsPhotoBtn
          : hasFilledField('carVinNumber', state)
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
  handleUnexpectedText(ctx)
);

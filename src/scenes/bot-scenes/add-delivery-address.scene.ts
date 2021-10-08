import { Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';

export const addDeliveryAddressScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddDeliveryAddress
);

addDeliveryAddressScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addDeliveryAddressNote)
);

addDeliveryAddressScene.on('text', async (ctx: IBotContext) => {
  const { state } = ctx.session;

  if (ctx.message !== undefined && 'text' in ctx.message) {
    state.deliveryAddress = ctx.message.text;
  }

  return ctx.scene.enter(
    state.hasFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.AddCarInfoScene
  );
});

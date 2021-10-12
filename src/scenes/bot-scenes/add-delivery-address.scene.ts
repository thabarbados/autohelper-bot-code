import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';

export const addDeliveryAddressScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddDeliveryAddress
);

addDeliveryAddressScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addDeliveryAddressNote, Markup.removeKeyboard())
);

addDeliveryAddressScene.on('text', async (ctx: IBotContext) => {
  const { setDeliveryAddress, isFilledOrder } = ctx.session.state.orderModule;

  if (ctx.message !== undefined && 'text' in ctx.message) {
    setDeliveryAddress(ctx.message.text);
  }

  return ctx.scene.enter(
    isFilledOrder ? ScenesNames.OrderConfirmation : ScenesNames.AddCarInfoScene
  );
});

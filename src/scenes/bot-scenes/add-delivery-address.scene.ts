import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '../../configs';
import { IBotContext } from '../../domain';

export const addDeliveryAddressScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddDeliveryAddress
);

addDeliveryAddressScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.deliveryAddressNote)
);

addDeliveryAddressScene.on('text', async (ctx: IBotContext) => {
  if (ctx.message !== undefined && 'text' in ctx.message) {
    ctx.session.state.deliveryAddress = ctx.message.text;
  }

  return ctx.scene.enter(ScenesNames.AddCarInfoScene);
});

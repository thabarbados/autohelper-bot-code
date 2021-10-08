import { Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';

export const addOrderTextDescriptionScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddOrderTextDescription
);

addOrderTextDescriptionScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addTextDescriptionNote)
);

addOrderTextDescriptionScene.on('text', async (ctx: IBotContext) => {
  const { state } = ctx.session;

  if (ctx.message !== undefined && 'text' in ctx.message) {
    state.orderTextDescription = ctx.message.text;
  }

  return ctx.scene.enter(
    state.hasFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseDeliveryType
  );
});

import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';

export const addOrderTextDescriptionScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddOrderTextDescription
);

addOrderTextDescriptionScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addTextDescriptionNote, Markup.removeKeyboard())
);

addOrderTextDescriptionScene.on('text', async (ctx: IBotContext) => {
  const { setOrderTextDescription, isFilledOrder } =
    ctx.session.state.orderModule;

  if (ctx.message !== undefined && 'text' in ctx.message) {
    setOrderTextDescription(ctx.message.text);
  }

  return ctx.scene.enter(
    isFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseDeliveryType
  );
});

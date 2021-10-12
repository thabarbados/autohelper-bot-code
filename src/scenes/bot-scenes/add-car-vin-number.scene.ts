import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';

export const addCarVinNumberScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddCarVinNumber
);

addCarVinNumberScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addCarVinNumberNote, Markup.removeKeyboard())
);

addCarVinNumberScene.on('text', async (ctx: IBotContext) => {
  const { setCarVinNumber, isFilledOrder } = ctx.session.state.orderModule;

  if (ctx.message !== undefined && 'text' in ctx.message) {
    setCarVinNumber(ctx.message.text);
  }

  return ctx.scene.enter(
    isFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseOrderQuality
  );
});

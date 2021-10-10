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
  const { state } = ctx.session;

  if (ctx.message !== undefined && 'text' in ctx.message) {
    state.carVinNumber = ctx.message.text;
  }

  return ctx.scene.enter(
    state.hasFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseOrderQuality
  );
});

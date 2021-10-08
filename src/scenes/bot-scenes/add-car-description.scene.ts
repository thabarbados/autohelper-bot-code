import { Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';

export const addCarDescriptionScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddCarDescription
);

addCarDescriptionScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addCarDescriptionNote)
);

addCarDescriptionScene.on('text', async (ctx: IBotContext) => {
  const { state } = ctx.session;

  if (ctx.message !== undefined && 'text' in ctx.message) {
    state.carDescription = ctx.message.text;
  }

  return ctx.scene.enter(
    state.hasFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseOrderQuality
  );
});

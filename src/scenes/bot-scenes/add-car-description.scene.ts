import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';

export const addCarDescriptionScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddCarDescription
);

addCarDescriptionScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addCarDescriptionNote, Markup.removeKeyboard())
);

addCarDescriptionScene.on('text', async (ctx: IBotContext) => {
  const { isFilledOrder, setCarDescription } = ctx.session.state.orderModule;

  if (ctx.message !== undefined && 'text' in ctx.message) {
    setCarDescription(ctx.message.text);
  }

  return ctx.scene.enter(
    isFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseOrderQuality
  );
});

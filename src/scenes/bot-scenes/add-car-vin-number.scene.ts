import { Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';

export const addCarVinNumberScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddCarVinNumber
);

addCarVinNumberScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addCarVinNumberNote)
);

addCarVinNumberScene.on('text', async (ctx: IBotContext) => {
  if (ctx.message !== undefined && 'text' in ctx.message) {
    ctx.session.state.autoVinNumber = ctx.message.text;
  }

  return ctx.scene.enter(ScenesNames.ChooseOrderQuality);
});

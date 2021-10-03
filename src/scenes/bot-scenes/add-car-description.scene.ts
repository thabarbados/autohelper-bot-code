import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '../../configs';
import { IBotContext } from '../../domain';

export const addCarDescriptionScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddCarDescription
);

addCarDescriptionScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addAutoDescriptionNote)
);

addCarDescriptionScene.on('text', async (ctx: IBotContext) => {
  if (ctx.message !== undefined && 'text' in ctx.message) {
    ctx.session.state.autoParams = ctx.message.text;
  }

  return ctx.scene.enter(ScenesNames.ChooseOrderQuality);
});
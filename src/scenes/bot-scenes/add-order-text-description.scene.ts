import { Markup, Scenes } from 'telegraf';

import { botTexts, ScenesNames } from '../../configs';
import { IBotContext } from '../../domain';

export const addOrderTextDescriptionScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddOrderTextDescription
);

addOrderTextDescriptionScene.enter((ctx: IBotContext) =>
  ctx.reply(botTexts.addTextDescriptionNote)
);

addOrderTextDescriptionScene.on('text', async (ctx: IBotContext) => {
  if (ctx.message !== undefined && 'text' in ctx.message) {
    ctx.session.state.orderTextDescription = ctx.message.text;
  }

  return ctx.scene.enter(ScenesNames.ChooseDeliveryType);
});

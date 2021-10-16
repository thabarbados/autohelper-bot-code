import { Markup, Scenes } from 'telegraf';

import { handleUnexpectedText } from '@src/scenes';
import { botTexts, buttonsValue, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';

export const startNextOrderScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.StartNextOrder
);

startNextOrderScene.enter((ctx: IBotContext) => {
  return ctx.reply(
    botTexts.startNextOrderNotice,
    Markup.keyboard([
      [buttonsValue.startNextOrder],
      [buttonsValue.stopCreateOrders],
    ])
  );
});

startNextOrderScene.on('text', (ctx: IBotContext) =>
  handleUnexpectedText(ctx, 'buttons')
);

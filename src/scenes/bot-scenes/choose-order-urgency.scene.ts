import { Markup, Scenes } from 'telegraf';

import { handleUnexpectedText } from '@src/scenes';
import { botTexts, buttonsValue, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';

export const chooseOrderUrgencyScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.ChooseOrderUrgency
);

chooseOrderUrgencyScene.enter((ctx: IBotContext) => {
  return ctx.reply(
    botTexts.chooseOrderUrgencyNote,
    Markup.keyboard([
      [buttonsValue.lowUrgensyOrderBtn],
      [buttonsValue.highUrgencyOrderBtn],
    ])
      .oneTime()
      .resize()
  );
});

chooseOrderUrgencyScene.on('text', (ctx: IBotContext) =>
  handleUnexpectedText(ctx)
);

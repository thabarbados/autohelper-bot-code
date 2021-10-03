import { Markup, Scenes } from 'telegraf';

import { botTexts, buttonsValue, ScenesNames } from '../../configs';
import { IBotContext } from '../../domain';

export const chooseOrderUrgencyScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.ChooseOrderUrgency
);

chooseOrderUrgencyScene.enter((ctx: IBotContext) => {
  return ctx.reply(
    botTexts.orderUrgencyNote,
    Markup.keyboard([
      [buttonsValue.lowUrgensyOrder],
      [buttonsValue.highUrgencyOrder],
    ])
      .oneTime()
      .resize()
  );
});

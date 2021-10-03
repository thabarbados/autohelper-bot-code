import { Markup, Scenes } from 'telegraf';

import { botTexts, buttonsValue, ScenesNames } from '../../configs';
import { IBotContext } from '../../domain';

export const chooseOrderQualityScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.ChooseOrderQuality
);

chooseOrderQualityScene.enter((ctx: IBotContext) => {
  return ctx.reply(
    botTexts.chooseOrderQualityNote,
    Markup.keyboard([
      [buttonsValue.orderOriginalQualityBtn],
      [buttonsValue.orderCheapQualityBtn],
      [buttonsValue.orderBaseQualityBtn],
    ])
      .oneTime()
      .resize()
  );
});

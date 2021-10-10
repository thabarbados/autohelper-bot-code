import { Markup, Scenes } from 'telegraf';

import { handleUnexpectedText } from '@src/scenes';
import { botTexts, buttonsValue, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';

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

chooseOrderQualityScene.on('text', (ctx: IBotContext) =>
  handleUnexpectedText(ctx, 'buttons')
);

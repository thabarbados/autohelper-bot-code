import { Markup, Scenes } from 'telegraf';

import { handleUnexpectedText } from '@src/scenes';
import { botTexts, buttonsValue, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';

export const chooseDeliveryTypeScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.ChooseDeliveryType
);

chooseDeliveryTypeScene.enter((ctx: IBotContext) => {
  return ctx.reply(
    botTexts.chooseDeliveryTypeNote,
    Markup.keyboard([
      [buttonsValue.orderFromPointBtn],
      [buttonsValue.orderWithDeliveryBtn],
    ])
      .oneTime()
      .resize()
  );
});

chooseDeliveryTypeScene.on('text', (ctx: IBotContext) =>
  handleUnexpectedText(ctx, 'buttons')
);

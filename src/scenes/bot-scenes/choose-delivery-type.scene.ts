import { Markup, Scenes } from 'telegraf';
import { handleUnexpectedText } from '../helpers/handle-text-helper';

import { botTexts, buttonsValue, ScenesNames } from '../../configs';
import { IBotContext } from '../../domain';

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
  handleUnexpectedText(ctx)
);

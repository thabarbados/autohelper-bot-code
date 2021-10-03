import { Markup, Scenes } from 'telegraf';

import { botTexts, buttonsValue, ScenesNames } from '../../configs';
import { IBotContext } from '../../domain';

export const chooseDeliveryTypeScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.ChooseDeliveryType
);

chooseDeliveryTypeScene.enter((ctx: IBotContext) => {
  return ctx.reply(
    botTexts.chooseDeliveryTypeNote,
    Markup.keyboard([
      [buttonsValue.selfOrderPickUp],
      [buttonsValue.pointOrderPickUp],
      [buttonsValue.orderWithDelivery],
    ])
      .oneTime()
      .resize()
  );
});

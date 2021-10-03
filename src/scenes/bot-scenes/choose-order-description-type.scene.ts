import { Markup, Scenes } from 'telegraf';

import { botTexts, buttonsValue, ScenesNames } from '../../configs';
import { IBotContext } from '../../domain';

export const chooseOrderDescriptionTypeScene =
  new Scenes.BaseScene<IBotContext>(ScenesNames.ChooseOrderDescriptionType);

chooseOrderDescriptionTypeScene.enter(async (ctx: IBotContext) => {
  return ctx.reply(
    botTexts.chooseOrderDescriptionTypeNote,
    Markup.keyboard([
      [buttonsValue.addPhotoDescription],
      [buttonsValue.addTextDescription],
    ])
      .oneTime()
      .resize()
  );
});
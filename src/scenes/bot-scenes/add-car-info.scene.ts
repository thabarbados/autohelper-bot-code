import { Markup, Scenes } from 'telegraf';

import { botTexts, buttonsValue, ScenesNames } from '../../configs';
import { IBotContext } from '../../domain';

export const addCarInfoScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddCarInfoScene
);

addCarInfoScene.enter((ctx: IBotContext) => {
  return ctx.reply(
    botTexts.addAutoInfoNote,
    Markup.keyboard([
      [buttonsValue.addAutoDocPhotoTitle],
      [buttonsValue.addAutoVinNumberTitle],
      [buttonsValue.addAutoDescriptionTitle],
    ])
      .oneTime()
      .resize()
  );
});

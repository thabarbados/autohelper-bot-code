import { Markup, Scenes } from 'telegraf';

import { botTexts, buttonsValue, ScenesNames } from '../../configs';
import { IBotContext } from '../../domain';

export const addCarInfoScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.AddCarInfoScene
);

addCarInfoScene.enter((ctx: IBotContext) => {
  return ctx.reply(
    botTexts.addCarInfoNote,
    Markup.keyboard([
      [buttonsValue.addCarDocsPhotoBtn],
      [buttonsValue.addCarVinNumberBtn],
      [buttonsValue.addCarDescriptionBtn],
    ])
      .oneTime()
      .resize()
  );
});

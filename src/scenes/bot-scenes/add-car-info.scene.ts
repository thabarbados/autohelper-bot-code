import { Markup, Scenes } from 'telegraf';

import { handleUnexpectedText } from '@src/scenes';
import { botTexts, buttonsValue, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';

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

addCarInfoScene.on('text', (ctx: IBotContext) => handleUnexpectedText(ctx, 'buttons'));

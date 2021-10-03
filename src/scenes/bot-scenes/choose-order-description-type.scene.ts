import { Markup, Scenes } from 'telegraf';
import { handleUnexpectedText } from '../helpers/handle-text-helper';

import { botTexts, buttonsValue, ScenesNames } from '../../configs';
import { IBotContext } from '../../domain';

export const chooseOrderDescriptionTypeScene =
  new Scenes.BaseScene<IBotContext>(ScenesNames.ChooseOrderDescriptionType);

chooseOrderDescriptionTypeScene.enter(async (ctx: IBotContext) => {
  return ctx.reply(
    botTexts.chooseOrderDescriptionTypeNote,
    Markup.keyboard([
      [buttonsValue.addPhotoDescriptionBtn],
      [buttonsValue.addTextDescriptionBtn],
    ])
      .oneTime()
      .resize()
  );
});

chooseOrderDescriptionTypeScene.on('text', (ctx: IBotContext) =>
  handleUnexpectedText(ctx)
);

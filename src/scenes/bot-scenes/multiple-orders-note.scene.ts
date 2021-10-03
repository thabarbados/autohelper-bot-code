import { Markup, Scenes } from 'telegraf';

import { botTexts, buttonsValue, ScenesNames } from '../../configs';
import { IBotContext } from '../../domain';

export const multipleOrdersNoteScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.MultipleOrdersNote
);

multipleOrdersNoteScene.enter(async (ctx: IBotContext) => {
  ctx.session.state.isMultipleOrder = true;

  return ctx.reply(
    botTexts.fewPartsNote,
    Markup.keyboard([[buttonsValue.multipleOrdersHint]])
      .oneTime()
      .resize()
  );
});

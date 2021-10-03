import { Markup, Scenes } from 'telegraf';

import { botTexts, buttonsValue, ScenesNames } from '../../configs';
import { IBotContext } from '../../domain';

export const multipleOrdersNoticeScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.MultipleOrdersNotice
);

multipleOrdersNoticeScene.enter(async (ctx: IBotContext) => {
  ctx.session.state.isMultipleOrder = true;

  return ctx.reply(
    botTexts.multipleOrdersNotice,
    Markup.keyboard([[buttonsValue.multipleOrdersOKBtn]])
      .oneTime()
      .resize()
  );
});

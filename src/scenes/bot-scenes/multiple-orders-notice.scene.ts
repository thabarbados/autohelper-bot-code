import { Markup, Scenes } from 'telegraf';

import { handleUnexpectedText } from '@src/scenes';
import { botTexts, buttonsValue, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';

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

multipleOrdersNoticeScene.on('text', (ctx: IBotContext) =>
  handleUnexpectedText(ctx)
);

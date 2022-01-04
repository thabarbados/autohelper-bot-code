import { Markup, Scenes } from 'telegraf';

import { buttonsValue, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';
import { getClientMessage } from '@src/services';

export const clientMessageConfirmationScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.ClientMessageConfirmation
);

clientMessageConfirmationScene.enter((ctx: IBotContext) => {
  const text = getClientMessage(ctx.session.admin);

  ctx.reply(
    text,
    Markup.keyboard([
      [buttonsValue.sendClientMessage],
      [buttonsValue.changeClientMessage],
      [buttonsValue.stopSendClientMessage],
    ])
      .oneTime()
      .resize()
  );
});

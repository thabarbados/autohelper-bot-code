import { Markup, Scenes } from 'telegraf';

import { botState } from '@src/store';
import { botTexts, buttonsValue, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';
import { handleUnexpectedText } from '@src/scenes';

export const chooseOrdersCountScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.ChooseOrderCount
);

chooseOrdersCountScene.enter(async (ctx: IBotContext) => {
  ctx.session.state = { ...botState };

  ctx.session.state.userName =
    ctx.chat !== undefined && 'first_name' in ctx.chat
      ? ctx.chat.first_name
      : '';

  ctx.session.state.userSurname =
    ctx.chat !== undefined &&
    'last_name' in ctx.chat &&
    ctx.chat.last_name !== undefined
      ? ctx.chat.last_name
      : '';

  ctx.session.state.userNickname =
    ctx.chat !== undefined &&
    'username' in ctx.chat &&
    ctx.chat.username !== undefined
      ? ctx.chat.username
      : '';

  ctx.session.state.userChatId = ctx.chat?.id !== undefined ? ctx.chat.id : 0;

  const userName =
    ctx.message !== undefined && ctx.message.from.first_name.length > 0
      ? ctx.message.from.first_name
      : botTexts.defaultUserName;

  return await ctx.reply(
    botTexts.welcomeMessage(userName),
    Markup.keyboard([
      [buttonsValue.singleOrderBtn],
      [buttonsValue.multipleOrdersBtn],
    ])
      .oneTime()
      .resize()
  );
});

chooseOrdersCountScene.on('text', (ctx: IBotContext) =>
  handleUnexpectedText(ctx, 'buttons')
);

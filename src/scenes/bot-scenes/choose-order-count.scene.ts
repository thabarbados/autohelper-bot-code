import { Markup, Scenes } from 'telegraf';

import { BotModule } from '@src/store';
import { botTexts, buttonsValue, ScenesNames } from '@src/configs';
import { IBotContext } from '@src/domain';
import { handleUnexpectedText, switchScene } from '@src/scenes';

export const chooseOrdersCountScene = new Scenes.BaseScene<IBotContext>(
  ScenesNames.ChooseOrderCount
);

chooseOrdersCountScene.enter(async (ctx: IBotContext) => {
  const wasShowMultipleOrderNotice =
    ctx.session.state?.orderModule?.isMultipleOrder === true;

  ctx.session.state = new BotModule();

  const {
    setUserName,
    setUserSurname,
    setUserNickname,
    setUserChatId,
    setOrderMultipleStatus,
  } = ctx.session.state.orderModule;

  const { chat } = ctx;

  if (wasShowMultipleOrderNotice) {
    setOrderMultipleStatus(true);
  }

  if ('first_name' in chat) {
    setUserName(chat.first_name);
  }

  if ('last_name' in chat && chat.last_name !== undefined) {
    setUserSurname(chat.last_name);
  }

  if ('username' in chat && chat.username !== undefined) {
    setUserNickname(chat.username);
  }

  setUserChatId(chat.id);

  const { userName } = ctx.session.state.orderModule;

  const welcomeName =
    userName?.length > 0 ? userName : botTexts.defaultUserName;

  if (wasShowMultipleOrderNotice) {
    switchScene(ctx, ScenesNames.ChooseOrderDescriptionType);
  } else {
    return await ctx.reply(
      botTexts.welcomeMessage(welcomeName),
      Markup.keyboard([
        [buttonsValue.singleOrderBtn],
        [buttonsValue.multipleOrdersBtn],
      ])
        .oneTime()
        .resize()
    );
  }
});

chooseOrdersCountScene.on('text', (ctx: IBotContext) =>
  handleUnexpectedText(ctx, 'buttons')
);

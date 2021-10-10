import { IBotContext } from '@src/domain';
import { botTexts } from '@src/configs';

export const handleUnexpectedText = (
  ctx: IBotContext,
  actionsType: 'buttons' | 'chooseFile' | 'waitingBot'
) =>
  ctx.reply(
    actionsType === 'buttons'
      ? botTexts.unexpectedTextWithButton
      : actionsType === 'chooseFile'
      ? botTexts.unexpectedTextWithChooseFile
      : actionsType === 'waitingBot'
      ? botTexts.unexpectedTextWithBotAnswer
      : botTexts.errorText
  );

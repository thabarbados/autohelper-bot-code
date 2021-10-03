import { IBotContext } from '@src/domain';
import { botTexts } from '@src/configs';

export const handleUnexpectedText = (ctx: IBotContext) =>
  ctx.reply(botTexts.unexpectedTextNote);

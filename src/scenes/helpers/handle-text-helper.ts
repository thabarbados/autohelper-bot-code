import { IBotContext } from '../../domain';
import { botTexts } from '../../configs';

export const handleUnexpectedText = (ctx: IBotContext) =>
  ctx.reply(botTexts.unexpectedTextNote);

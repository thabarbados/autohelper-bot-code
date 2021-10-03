import { Telegraf, session } from 'telegraf';

import { stage } from '@src/scenes';
import { BOT_TOKEN } from '@src/configs';
import { IBotContext } from '@src/domain';

const bot = new Telegraf<IBotContext>(BOT_TOKEN);
bot.use(session());
bot.use(stage.middleware());
bot.launch();

export const getFileLink = async (id: string) =>
  await bot.telegram.getFileLink(id);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

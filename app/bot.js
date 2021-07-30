const { Telegraf } = require('telegraf');
const { botToken } = require('../data/data');

const bot = new Telegraf(botToken);

bot.start((ctx) => ctx.reply('Welcome'));
bot.launch();

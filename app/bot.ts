import { Telegraf, Markup, Scenes, session, Context } from 'telegraf';
import { botState, IBotState } from '../store/store';
import { botToken, slavaChatId } from '../botData/botData';
import { actionsNames, getOrderText, orderKeys } from '../texts/names';

const { BaseScene, Stage } = Scenes;

const selectOrdersCountScene = new BaseScene<IBotContext>(
  'selectOrdersCountScene'
);
selectOrdersCountScene.enter(async (ctx: IBotContext) => {
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
      : actionsNames.defaultUserName;

  return await ctx.reply(
    actionsNames.welcomeString(userName),
    Markup.keyboard([[actionsNames.singleOrder], [actionsNames.multipleOrders]])
      .oneTime()
      .resize()
  );
});

const multipleOrdersNoteScene = new BaseScene<IBotContext>(
  'multipleOrdersNoteScene'
);
multipleOrdersNoteScene.enter(async (ctx: IBotContext) => {
  ctx.session.state.isMultipleOrder = true;

  return ctx.reply(
    actionsNames.fewPartsNote,
    Markup.keyboard([[actionsNames.multipleOrdersHint]])
      .oneTime()
      .resize()
  );
});

const selectOrderDescriptionTypeScene = new BaseScene<IBotContext>(
  'selectOrderDescriptionTypeScene'
);
selectOrderDescriptionTypeScene.enter(async (ctx: IBotContext) => {
  return ctx.reply(
    actionsNames.chooseOrderDescriptionTypeNote,
    Markup.keyboard([
      [actionsNames.addPhotoDescription],
      [actionsNames.addTextDescription],
    ])
      .oneTime()
      .resize()
  );
});

const addPhotoDescriptionToOrderScene = new BaseScene<IBotContext>(
  'addPhotoDescriptionToOrderScene'
);
addPhotoDescriptionToOrderScene.enter((ctx: IBotContext) =>
  ctx.reply(actionsNames.addPhotoDescriptionNote)
);
addPhotoDescriptionToOrderScene.on('photo', async (ctx: IBotContext) => {
  if (ctx.message !== undefined && 'photo' in ctx.message) {
    const largePhotoID =
      ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const fileData = await bot.telegram.getFileLink(largePhotoID);

    ctx.session.state.orderPhotoUrl = fileData.href;
  }

  return ctx.scene.enter('selectDeliveryTypeScene');
});

const addTextDescriptionToOrderScene = new BaseScene<IBotContext>(
  'addTextDescriptionToOrderScene'
);
addTextDescriptionToOrderScene.enter((ctx: IBotContext) =>
  ctx.reply(actionsNames.addTextDescriptionNote)
);
addTextDescriptionToOrderScene.on('text', async (ctx: IBotContext) => {
  if (ctx.message !== undefined && 'text' in ctx.message) {
    ctx.session.state.orderTextDescription = ctx.message.text;
  }

  return ctx.scene.enter('selectDeliveryTypeScene');
});

const selectDeliveryTypeScene = new BaseScene<IBotContext>(
  'selectDeliveryTypeScene'
);
selectDeliveryTypeScene.enter((ctx: IBotContext) => {
  return ctx.reply(
    actionsNames.chooseDeliveryTypeNote,
    Markup.keyboard([
      [actionsNames.selfOrderPickUp],
      [actionsNames.pointOrderPickUp],
      [actionsNames.orderWithDelivery],
    ])
      .oneTime()
      .resize()
  );
});

const addDeliveryAddressScene = new BaseScene<IBotContext>(
  'addDeliveryAddressScene'
);
addDeliveryAddressScene.enter((ctx: IBotContext) =>
  ctx.reply(actionsNames.deliveryAddressNote)
);
addDeliveryAddressScene.on('text', async (ctx: IBotContext) => {
  if (ctx.message !== undefined && 'text' in ctx.message) {
    ctx.session.state.deliveryAddress = ctx.message.text;
  }

  return ctx.scene.enter('addAutoInfoScene');
});

const addAutoInfoScene = new BaseScene<IBotContext>('addAutoInfoScene');
addAutoInfoScene.enter((ctx: IBotContext) => {
  return ctx.reply(
    actionsNames.addAutoInfoNote,
    Markup.keyboard([
      [actionsNames.addAutoDocPhotoTitle],
      [actionsNames.addAutoVinNumberTitle],
      [actionsNames.addAutoDescriptionTitle],
    ])
      .oneTime()
      .resize()
  );
});

const addAutoDocPhotoScene = new BaseScene<IBotContext>('addAutoDocPhotoScene');
addAutoDocPhotoScene.enter((ctx: IBotContext) =>
  ctx.reply(actionsNames.addAutoDocPhotoNote)
);
addAutoDocPhotoScene.on('photo', async (ctx: IBotContext) => {
  if (ctx.message !== undefined && 'photo' in ctx.message) {
    const largePhotoID =
      ctx.message.photo[ctx.message.photo.length - 1].file_id;
    const fileData = await bot.telegram.getFileLink(largePhotoID);

    ctx.session.state.autoDocPhotoUrl = fileData.href;
  }

  return ctx.scene.enter('selectPartsQualityScene');
});

const addAutoVinNumberScene = new BaseScene<IBotContext>(
  'addAutoVinNumberScene'
);
addAutoVinNumberScene.enter((ctx: IBotContext) =>
  ctx.reply(actionsNames.addAutoVinNumberNote)
);
addAutoVinNumberScene.on('text', async (ctx: IBotContext) => {
  if (ctx.message !== undefined && 'text' in ctx.message) {
    ctx.session.state.autoVinNumber = ctx.message.text;
  }

  return ctx.scene.enter('selectPartsQualityScene');
});

const addAutoParamsScene = new BaseScene<IBotContext>('addAutoParamsScene');
addAutoParamsScene.enter((ctx: IBotContext) =>
  ctx.reply(actionsNames.addAutoDescriptionNote)
);
addAutoParamsScene.on('text', async (ctx: IBotContext) => {
  if (ctx.message !== undefined && 'text' in ctx.message) {
    ctx.session.state.autoParams = ctx.message.text;
  }

  return ctx.scene.enter('selectPartsQualityScene');
});

const selectPartsQualityScene = new BaseScene<IBotContext>(
  'selectPartsQualityScene'
);
selectPartsQualityScene.enter((ctx: IBotContext) => {
  return ctx.reply(
    actionsNames.partsQualityNote,
    Markup.keyboard([
      [actionsNames.originalPartsQuality],
      [actionsNames.cheapPartsQuality],
      [actionsNames.goodPartsQuality],
    ])
      .oneTime()
      .resize()
  );
});

const selectOrderUrgencyScene = new BaseScene<IBotContext>(
  'selectOrderUrgencyScene'
);
selectOrderUrgencyScene.enter((ctx: IBotContext) => {
  return ctx.reply(
    actionsNames.orderUrgencyNote,
    Markup.keyboard([
      [actionsNames.lowUrgensyOrder],
      [actionsNames.highUrgencyOrder],
    ])
      .oneTime()
      .resize()
  );
});

const createOrderScene = new BaseScene<IBotContext>('createOrderScene');
createOrderScene.enter(async (ctx: IBotContext) => {
  await ctx.reply(actionsNames.fullOrderDataNote);
  Markup.removeKeyboard();

  const chatIds = [slavaChatId];

  const orderMessage = getOrderText(ctx.session.state);

  for (const id of chatIds) {
    await ctx.telegram.sendMessage(id, orderMessage, { parse_mode: 'HTML' });

    if (ctx.session.state.orderPhotoUrl.length > 0) {
      await ctx.telegram.sendPhoto(
        id,
        {
          url: ctx.session.state.orderPhotoUrl,
        },
        { caption: orderKeys.orderPhotoText }
      );
    }

    if (ctx.session.state.autoDocPhotoUrl.length > 0) {
      await ctx.telegram.sendPhoto(
        id,
        {
          url: ctx.session.state.autoDocPhotoUrl,
        },
        {
          caption: orderKeys.orderCarDocPhotoText,
        }
      );
    }
  }

  return;
});

const stage = new Stage<IBotContext>([
  selectOrdersCountScene,
  multipleOrdersNoteScene,
  selectOrderDescriptionTypeScene,
  addPhotoDescriptionToOrderScene,
  addTextDescriptionToOrderScene,
  selectDeliveryTypeScene,
  addDeliveryAddressScene,
  addAutoInfoScene,
  addAutoDocPhotoScene,
  addAutoVinNumberScene,
  addAutoParamsScene,
  selectPartsQualityScene,
  selectOrderUrgencyScene,
  createOrderScene,
]);

stage.hears(actionsNames.multipleOrders, (ctx: IBotContext) =>
  ctx.scene.enter('multipleOrdersNoteScene')
);
stage.hears(
  [actionsNames.singleOrder, actionsNames.multipleOrdersHint],
  (ctx: IBotContext) => ctx.scene.enter('selectOrderDescriptionTypeScene')
);
stage.hears(actionsNames.addPhotoDescription, (ctx: IBotContext) =>
  ctx.scene.enter('addPhotoDescriptionToOrderScene')
);
stage.hears(actionsNames.addTextDescription, (ctx: IBotContext) =>
  ctx.scene.enter('addTextDescriptionToOrderScene')
);
stage.hears(actionsNames.selfOrderPickUp, (ctx: IBotContext) => {
  ctx.session.state.deliveryType = actionsNames.selfOrderPickUp;
  ctx.scene.enter('addAutoInfoScene');
});
stage.hears(actionsNames.pointOrderPickUp, (ctx: IBotContext) => {
  ctx.session.state.deliveryType = actionsNames.pointOrderPickUp;
  ctx.scene.enter('addAutoInfoScene');
});
stage.hears(actionsNames.orderWithDelivery, (ctx: IBotContext) => {
  ctx.session.state.deliveryType = actionsNames.orderWithDelivery;
  ctx.scene.enter('addDeliveryAddressScene');
});
stage.hears(actionsNames.addAutoDocPhotoTitle, (ctx: IBotContext) =>
  ctx.scene.enter('addAutoDocPhotoScene')
);
stage.hears(actionsNames.addAutoVinNumberTitle, (ctx: IBotContext) =>
  ctx.scene.enter('addAutoVinNumberScene')
);
stage.hears(actionsNames.addAutoDescriptionTitle, (ctx: IBotContext) =>
  ctx.scene.enter('addAutoParamsScene')
);
stage.hears(actionsNames.originalPartsQuality, (ctx: IBotContext) => {
  ctx.session.state.partsQuality = actionsNames.originalPartsQuality;
  ctx.scene.enter('selectOrderUrgencyScene');
});
stage.hears(actionsNames.cheapPartsQuality, (ctx: IBotContext) => {
  ctx.session.state.partsQuality = actionsNames.cheapPartsQuality;
  ctx.scene.enter('selectOrderUrgencyScene');
});
stage.hears(actionsNames.goodPartsQuality, (ctx: IBotContext) => {
  ctx.session.state.partsQuality = actionsNames.goodPartsQuality;
  ctx.scene.enter('selectOrderUrgencyScene');
});
stage.hears(actionsNames.lowUrgensyOrder, (ctx: IBotContext) => {
  ctx.session.state.orderUrgency = actionsNames.lowUrgensyOrder;
  ctx.scene.enter('createOrderScene');
});
stage.hears(actionsNames.highUrgencyOrder, (ctx: IBotContext) => {
  ctx.session.state.orderUrgency = actionsNames.highUrgencyOrder;
  ctx.scene.enter('createOrderScene');
});

stage.command('/start', (ctx: IBotContext) =>
  ctx.scene.enter('selectOrdersCountScene')
);

interface IBotSession extends Scenes.SceneSession {
  state: IBotState;
}

interface IBotContext extends Context {
  session: IBotSession;
  scene: Scenes.SceneContextScene<IBotContext>;
}

const bot = new Telegraf<IBotContext>(botToken);
bot.use(session());
bot.use(stage.middleware());
bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

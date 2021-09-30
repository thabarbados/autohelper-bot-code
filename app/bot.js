const {
  Telegraf,
  Markup,
  session,
  Scenes: { BaseScene, Stage },
} = require("telegraf");

const {
  botToken,
  slavaChatId,
  artemChatId,
  andreyChatId,
} = require("../botData/botData");
const { actionsNames, orderKeys } = require("../texts/names");
const { botState, resetStateToDefault } = require("../store/store");

const selectOrdersCountScene = new BaseScene("selectOrdersCountScene");
selectOrdersCountScene.enter(async (ctx) => {
  resetStateToDefault();
  console.log(botState);

  botState.userName =
    ctx.chat.first_name !== undefined ? ctx.chat.first_name : "";
  botState.userSurname =
    ctx.chat.last_name !== undefined ? ctx.chat.last_name : "";
  bot;
  botState.userNickname =
    ctx.chat.username !== undefined ? ctx.chat.username : "";
  botState.userChatId = ctx.chat.id;

  const userName =
    ctx.message.from.first_name.length > 0
      ? ctx.message.from.first_name
      : actionsNames.defaultUserName;

  return await ctx.reply(
    actionsNames.welcomeString(userName),
    Markup.keyboard([[actionsNames.singleOrder], [actionsNames.multipleOrders]])
      .oneTime()
      .resize()
  );
});

const multipleOrdersNoteScene = new BaseScene("multipleOrdersNoteScene");
multipleOrdersNoteScene.enter(async (ctx) => {
  botState.isMultipleOrder = true;

  return ctx.reply(
    actionsNames.fewPartsNote,
    Markup.keyboard([[actionsNames.multipleOrdersHint]])
      .oneTime()
      .resize()
  );
});

const selectOrderDescriptionTypeScene = new BaseScene(
  "selectOrderDescriptionTypeScene"
);
selectOrderDescriptionTypeScene.enter(async (ctx) => {
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

const addPhotoDescriptionToOrderScene = new BaseScene(
  "addPhotoDescriptionToOrderScene"
);
addPhotoDescriptionToOrderScene.enter((ctx) =>
  ctx.reply(actionsNames.addPhotoDescriptionNote)
);
addPhotoDescriptionToOrderScene.on("photo", async (ctx) => {
  const largePhotoID = ctx.message.photo[ctx.message.photo.length - 1].file_id;
  const fileData = await bot.telegram.getFileLink(largePhotoID);

  botState.orderPhotoUrl = fileData.href;

  return ctx.scene.enter("selectDeliveryTypeScene");
});

addTextDescriptionToOrderScene = new BaseScene(
  "addTextDescriptionToOrderScene"
);
addTextDescriptionToOrderScene.enter((ctx) =>
  ctx.reply(actionsNames.addTextDescriptionNote)
);
addTextDescriptionToOrderScene.on("text", async (ctx) => {
  botState.orderTextDescription = ctx.message.text;

  return ctx.scene.enter("selectDeliveryTypeScene");
});

const selectDeliveryTypeScene = new BaseScene("selectDeliveryTypeScene");
selectDeliveryTypeScene.enter((ctx) => {
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

const addDeliveryAddressScene = new BaseScene("addDeliveryAddressScene");
addDeliveryAddressScene.enter((ctx) =>
  ctx.reply(actionsNames.deliveryAddressNote)
);
addDeliveryAddressScene.on("text", async (ctx) => {
  botState.deliveryAddress = ctx.message.text;

  return ctx.scene.enter("addAutoInfoScene");
});

const addAutoInfoScene = new BaseScene("addAutoInfoScene");
addAutoInfoScene.enter((ctx) => {
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

const addAutoDocPhotoScene = new BaseScene("addAutoDocPhotoScene");
addAutoDocPhotoScene.enter((ctx) =>
  ctx.reply(actionsNames.addAutoDocPhotoNote)
);
addAutoDocPhotoScene.on("photo", async (ctx) => {
  const largePhotoID = ctx.message.photo[ctx.message.photo.length - 1].file_id;
  const fileData = await bot.telegram.getFileLink(largePhotoID);

  botState.autoDocPhotoUrl = fileData.href;

  return ctx.scene.enter("selectPartsQualityScene");
});

const addAutoVinNumberScene = new BaseScene("addAutoVinNumberScene");
addAutoVinNumberScene.enter((ctx) =>
  ctx.reply(actionsNames.addAutoVinNumberNote)
);
addAutoVinNumberScene.on("text", async (ctx) => {
  botState.autoVinNumber = ctx.message.text;

  return ctx.scene.enter("selectPartsQualityScene");
});

const addAutoParamsScene = new BaseScene("addAutoParamsScene");
addAutoParamsScene.enter((ctx) =>
  ctx.reply(actionsNames.addAutoDescriptionNote)
);
addAutoParamsScene.on("text", async (ctx) => {
  botState.autoParams = ctx.message.text;

  return ctx.scene.enter("selectPartsQualityScene");
});

const selectPartsQualityScene = new BaseScene("selectPartsQualityScene");
selectPartsQualityScene.enter((ctx) => {
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

const selectOrderUrgencyScene = new BaseScene("selectOrderUrgencyScene");
selectOrderUrgencyScene.enter((ctx) => {
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

const createOrderScene = new BaseScene("createOrderScene");
createOrderScene.enter(async (ctx) => {
  await ctx.reply(actionsNames.fullOrderDataNote);

  const chatIds = [slavaChatId];

  for (const id of chatIds) {
    await ctx.telegram.sendMessage(id, orderKeys.newOrderText);
    await ctx.telegram.sendMessage(
      id,
      orderKeys.userInfoText(
        botState.userName,
        botState.userNickname,
        botState.userChatId
      )
    );

    if (botState.orderPhotoUrl.length > 0) {
      await ctx.telegram.sendMessage(
        id,
        orderKeys.orderPhotoText(botState.orderPhotoUrl)
      );
    }

    if (botState.orderTextDescription.length > 0) {
      await ctx.telegram.sendMessage(
        id,
        orderKeys.orderDescriptionText(botState.orderTextDescription)
      );
    }

    await ctx.telegram.sendMessage(
      id,
      orderKeys.orderDeliveryText(
        botState.deliveryType,
        botState.deliveryAddress
      )
    );

    if (botState.autoDocPhotoUrl.length > 0) {
      await ctx.telegram.sendMessage(
        id,
        orderKeys.orderCarDocPhotoText(botState.autoDocPhotoUrl)
      );
    }

    if (botState.autoVinNumber.length > 0) {
      await ctx.telegram.sendMessage(
        id,
        orderKeys.orderCarVinNumberText(botState.autoVinNumber)
      );
    }

    if (botState.autoParams.length > 0) {
      await ctx.telegram.sendMessage(
        id,
        orderKeys.orderCarParamsText(botState.autoParams)
      );
    }

    await ctx.telegram.sendMessage(
      id,
      orderKeys.orderPartsQualityText(botState.partsQuality)
    );

    await ctx.telegram.sendMessage(
      id,
      orderKeys.orderUrgencyText(botState.orderUrgency)
    );
  }

  return;
});

const stage = new Stage([
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

stage.hears(actionsNames.multipleOrders, (ctx) =>
  ctx.scene.enter("multipleOrdersNoteScene")
);
stage.hears(
  [actionsNames.singleOrder, actionsNames.multipleOrdersHint],
  (ctx) => ctx.scene.enter("selectOrderDescriptionTypeScene")
);
stage.hears(actionsNames.addPhotoDescription, (ctx) =>
  ctx.scene.enter("addPhotoDescriptionToOrderScene")
);
stage.hears(actionsNames.addTextDescription, (ctx) =>
  ctx.scene.enter("addTextDescriptionToOrderScene")
);
stage.hears(actionsNames.selfOrderPickUp, (ctx) => {
  botState.deliveryType = actionsNames.selfOrderPickUp;
  ctx.scene.enter("addAutoInfoScene");
});
stage.hears(actionsNames.pointOrderPickUp, (ctx) => {
  botState.deliveryType = actionsNames.pointOrderPickUp;
  ctx.scene.enter("addAutoInfoScene");
});
stage.hears(actionsNames.orderWithDelivery, (ctx) => {
  botState.deliveryType = actionsNames.orderWithDelivery;
  ctx.scene.enter("addDeliveryAddressScene");
});
stage.hears(actionsNames.addAutoDocPhotoTitle, (ctx) =>
  ctx.scene.enter("addAutoDocPhotoScene")
);
stage.hears(actionsNames.addAutoVinNumberTitle, (ctx) =>
  ctx.scene.enter("addAutoVinNumberScene")
);
stage.hears(actionsNames.addAutoDescriptionTitle, (ctx) =>
  ctx.scene.enter("addAutoParamsScene")
);
stage.hears(actionsNames.originalPartsQuality, (ctx) => {
  botState.partsQuality = actionsNames.originalPartsQuality;
  ctx.scene.enter("selectOrderUrgencyScene");
});
stage.hears(actionsNames.cheapPartsQuality, (ctx) => {
  botState.partsQuality = actionsNames.cheapPartsQuality;
  ctx.scene.enter("selectOrderUrgencyScene");
});
stage.hears(actionsNames.goodPartsQuality, (ctx) => {
  botState.partsQuality = actionsNames.goodPartsQuality;
  ctx.scene.enter("selectOrderUrgencyScene");
});
stage.hears(actionsNames.lowUrgensyOrder, (ctx) => {
  botState.orderUrgency = actionsNames.lowUrgensyOrder;
  ctx.scene.enter("createOrderScene");
});
stage.hears(actionsNames.highUrgencyOrder, (ctx) => {
  botState.orderUrgency = actionsNames.highUrgencyOrder;
  ctx.scene.enter("createOrderScene");
});

stage.command("/start", (ctx) => ctx.scene.enter("selectOrdersCountScene"));

const bot = new Telegraf(botToken);
bot.use(session());
bot.use(stage.middleware());
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

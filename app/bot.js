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
const { botState } = require("../store/store");

const selectOrdersCountScene = new BaseScene("selectOrdersCountScene");
selectOrdersCountScene.enter(async (ctx) => {
  ctx.session.state = { ...botState };

  ctx.session.state.userName =
    ctx.chat.first_name !== undefined ? ctx.chat.first_name : "";
  ctx.session.state.userSurname =
    ctx.chat.last_name !== undefined ? ctx.chat.last_name : "";
  ctx.session.state.userNickname =
    ctx.chat.username !== undefined ? ctx.chat.username : "";
  ctx.session.state.userChatId = ctx.chat.id;

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
  ctx.session.state.isMultipleOrder = true;

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

  ctx.session.state.orderPhotoUrl = fileData.href;

  return ctx.scene.enter("selectDeliveryTypeScene");
});

addTextDescriptionToOrderScene = new BaseScene(
  "addTextDescriptionToOrderScene"
);
addTextDescriptionToOrderScene.enter((ctx) =>
  ctx.reply(actionsNames.addTextDescriptionNote)
);
addTextDescriptionToOrderScene.on("text", async (ctx) => {
  ctx.session.state.orderTextDescription = ctx.message.text;

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
  ctx.session.state.deliveryAddress = ctx.message.text;

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

  ctx.session.state.autoDocPhotoUrl = fileData.href;

  return ctx.scene.enter("selectPartsQualityScene");
});

const addAutoVinNumberScene = new BaseScene("addAutoVinNumberScene");
addAutoVinNumberScene.enter((ctx) =>
  ctx.reply(actionsNames.addAutoVinNumberNote)
);
addAutoVinNumberScene.on("text", async (ctx) => {
  ctx.session.state.autoVinNumber = ctx.message.text;

  return ctx.scene.enter("selectPartsQualityScene");
});

const addAutoParamsScene = new BaseScene("addAutoParamsScene");
addAutoParamsScene.enter((ctx) =>
  ctx.reply(actionsNames.addAutoDescriptionNote)
);
addAutoParamsScene.on("text", async (ctx) => {
  ctx.session.state.autoParams = ctx.message.text;

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
  Markup.removeKeyboard();

  const chatIds = [slavaChatId];

  for (const id of chatIds) {
    await ctx.telegram.sendMessage(id, orderKeys.newOrderText);
    await ctx.telegram.sendMessage(
      id,
      orderKeys.userInfoText(
        ctx.session.state.userName,
        ctx.session.state.userNickname,
        ctx.session.state.userChatId
      )
    );

    if (ctx.session.state.orderPhotoUrl.length > 0) {
      await ctx.telegram.sendMessage(
        id,
        orderKeys.orderPhotoText(ctx.session.state.orderPhotoUrl)
      );
    }

    if (ctx.session.state.orderTextDescription.length > 0) {
      await ctx.telegram.sendMessage(
        id,
        orderKeys.orderDescriptionText(ctx.session.state.orderTextDescription)
      );
    }

    await ctx.telegram.sendMessage(
      id,
      orderKeys.orderDeliveryText(
        ctx.session.state.deliveryType,
        ctx.session.state.deliveryAddress
      )
    );

    if (ctx.session.state.autoDocPhotoUrl.length > 0) {
      await ctx.telegram.sendMessage(
        id,
        orderKeys.orderCarDocPhotoText(ctx.session.state.autoDocPhotoUrl)
      );
    }

    if (ctx.session.state.autoVinNumber.length > 0) {
      await ctx.telegram.sendMessage(
        id,
        orderKeys.orderCarVinNumberText(ctx.session.state.autoVinNumber)
      );
    }

    if (ctx.session.state.autoParams.length > 0) {
      await ctx.telegram.sendMessage(
        id,
        orderKeys.orderCarParamsText(ctx.session.state.autoParams)
      );
    }

    await ctx.telegram.sendMessage(
      id,
      orderKeys.orderPartsQualityText(ctx.session.state.partsQuality)
    );

    await ctx.telegram.sendMessage(
      id,
      orderKeys.orderUrgencyText(ctx.session.state.orderUrgency)
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
  ctx.session.state.deliveryType = actionsNames.selfOrderPickUp;
  ctx.scene.enter("addAutoInfoScene");
});
stage.hears(actionsNames.pointOrderPickUp, (ctx) => {
  ctx.session.state.deliveryType = actionsNames.pointOrderPickUp;
  ctx.scene.enter("addAutoInfoScene");
});
stage.hears(actionsNames.orderWithDelivery, (ctx) => {
  ctx.session.state.deliveryType = actionsNames.orderWithDelivery;
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
  ctx.session.state.partsQuality = actionsNames.originalPartsQuality;
  ctx.scene.enter("selectOrderUrgencyScene");
});
stage.hears(actionsNames.cheapPartsQuality, (ctx) => {
  ctx.session.state.partsQuality = actionsNames.cheapPartsQuality;
  ctx.scene.enter("selectOrderUrgencyScene");
});
stage.hears(actionsNames.goodPartsQuality, (ctx) => {
  ctx.session.state.partsQuality = actionsNames.goodPartsQuality;
  ctx.scene.enter("selectOrderUrgencyScene");
});
stage.hears(actionsNames.lowUrgensyOrder, (ctx) => {
  ctx.session.state.orderUrgency = actionsNames.lowUrgensyOrder;
  ctx.scene.enter("createOrderScene");
});
stage.hears(actionsNames.highUrgencyOrder, (ctx) => {
  ctx.session.state.orderUrgency = actionsNames.highUrgencyOrder;
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

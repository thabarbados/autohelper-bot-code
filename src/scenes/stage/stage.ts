import { Scenes } from 'telegraf';

import { IBotContext } from '../../domain';
import { ScenesNames, buttonsValue } from '../../configs';

import {
  chooseOrdersCountScene,
  multipleOrdersNoteScene,
  chooseOrderDescriptionTypeScene,
  addOrderPhotoDescriptionScene,
  addOrderTextDescriptionScene,
  chooseDeliveryTypeScene,
  addDeliveryAddressScene,
  addCarInfoScene,
  addCarDocsPhotoScene,
  addCarVinNumberScene,
  addCarDescriptionScene,
  chooseOrderQualityScene,
  chooseOrderUrgencyScene,
  createOrderScene,
} from '../../scenes';

export const stage = new Scenes.Stage<IBotContext>([
  chooseOrdersCountScene,
  multipleOrdersNoteScene,
  chooseOrderDescriptionTypeScene,
  addOrderPhotoDescriptionScene,
  addOrderTextDescriptionScene,
  chooseDeliveryTypeScene,
  addDeliveryAddressScene,
  addCarInfoScene,
  addCarDocsPhotoScene,
  addCarVinNumberScene,
  addCarDescriptionScene,
  chooseOrderQualityScene,
  chooseOrderUrgencyScene,
  createOrderScene,
]);

stage.hears(buttonsValue.multipleOrders, (ctx: IBotContext) =>
  ctx.scene.enter(ScenesNames.MultipleOrdersNote)
);

stage.hears(
  [buttonsValue.singleOrder, buttonsValue.multipleOrdersHint],

  (ctx: IBotContext) => ctx.scene.enter(ScenesNames.ChooseOrderDescriptionType)
);

stage.hears(buttonsValue.addPhotoDescription, (ctx: IBotContext) =>
  ctx.scene.enter(ScenesNames.AddOrderPhotoDescription)
);

stage.hears(buttonsValue.addTextDescription, (ctx: IBotContext) =>
  ctx.scene.enter(ScenesNames.AddOrderTextDescription)
);

stage.hears(buttonsValue.selfOrderPickUp, (ctx: IBotContext) => {
  ctx.session.state.deliveryType = buttonsValue.selfOrderPickUp;

  ctx.scene.enter(ScenesNames.AddCarInfoScene);
});

stage.hears(buttonsValue.pointOrderPickUp, (ctx: IBotContext) => {
  ctx.session.state.deliveryType = buttonsValue.pointOrderPickUp;

  ctx.scene.enter(ScenesNames.AddCarInfoScene);
});

stage.hears(buttonsValue.orderWithDelivery, (ctx: IBotContext) => {
  ctx.session.state.deliveryType = buttonsValue.orderWithDelivery;

  ctx.scene.enter(ScenesNames.AddDeliveryAddress);
});

stage.hears(buttonsValue.addAutoDocPhotoTitle, (ctx: IBotContext) =>
  ctx.scene.enter(ScenesNames.AddCarDocsPhoto)
);

stage.hears(buttonsValue.addAutoVinNumberTitle, (ctx: IBotContext) =>
  ctx.scene.enter(ScenesNames.AddCarVinNumber)
);

stage.hears(buttonsValue.addAutoDescriptionTitle, (ctx: IBotContext) =>
  ctx.scene.enter(ScenesNames.AddCarDescription)
);

stage.hears(buttonsValue.originalPartsQuality, (ctx: IBotContext) => {
  ctx.session.state.partsQuality = buttonsValue.originalPartsQuality;

  ctx.scene.enter(ScenesNames.ChooseOrderUrgency);
});

stage.hears(buttonsValue.cheapPartsQuality, (ctx: IBotContext) => {
  ctx.session.state.partsQuality = buttonsValue.cheapPartsQuality;

  ctx.scene.enter(ScenesNames.ChooseOrderUrgency);
});

stage.hears(buttonsValue.goodPartsQuality, (ctx: IBotContext) => {
  ctx.session.state.partsQuality = buttonsValue.goodPartsQuality;

  ctx.scene.enter(ScenesNames.ChooseOrderUrgency);
});

stage.hears(buttonsValue.lowUrgensyOrder, (ctx: IBotContext) => {
  ctx.session.state.orderUrgency = buttonsValue.lowUrgensyOrder;

  ctx.scene.enter(ScenesNames.CreateOrder);
});

stage.hears(buttonsValue.highUrgencyOrder, (ctx: IBotContext) => {
  ctx.session.state.orderUrgency = buttonsValue.highUrgencyOrder;
  
  ctx.scene.enter(ScenesNames.CreateOrder);
});

stage.command('/start', (ctx: IBotContext) =>
  ctx.scene.enter(ScenesNames.ChooseOrderCount)
);

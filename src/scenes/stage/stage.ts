import { Scenes } from 'telegraf';

import { IBotContext } from '@src/domain';
import { ScenesNames, buttonsValue } from '@src/configs';

import {
  chooseOrdersCountScene,
  multipleOrdersNoticeScene,
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
  multipleOrdersNoticeScene,
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

stage.hears(buttonsValue.multipleOrdersBtn, (ctx: IBotContext) =>
  ctx.scene.enter(ScenesNames.MultipleOrdersNotice)
);

stage.hears(
  [buttonsValue.singleOrderBtn, buttonsValue.multipleOrdersOKBtn],
  (ctx: IBotContext) => ctx.scene.enter(ScenesNames.ChooseOrderDescriptionType)
);

stage.hears(buttonsValue.addPhotoDescriptionBtn, (ctx: IBotContext) =>
  ctx.scene.enter(ScenesNames.AddOrderPhotoDescription)
);

stage.hears(buttonsValue.addTextDescriptionBtn, (ctx: IBotContext) =>
  ctx.scene.enter(ScenesNames.AddOrderTextDescription)
);

stage.hears(buttonsValue.orderFromPointBtn, (ctx: IBotContext) => {
  ctx.session.state.deliveryType = buttonsValue.orderFromPointBtn;

  ctx.scene.enter(ScenesNames.AddCarInfoScene);
});

stage.hears(buttonsValue.orderWithDeliveryBtn, (ctx: IBotContext) => {
  ctx.session.state.deliveryType = buttonsValue.orderWithDeliveryBtn;

  ctx.scene.enter(ScenesNames.AddDeliveryAddress);
});

stage.hears(buttonsValue.addCarDocsPhotoBtn, (ctx: IBotContext) =>
  ctx.scene.enter(ScenesNames.AddCarDocsPhoto)
);

stage.hears(buttonsValue.addCarVinNumberBtn, (ctx: IBotContext) =>
  ctx.scene.enter(ScenesNames.AddCarVinNumber)
);

stage.hears(buttonsValue.addCarDescriptionBtn, (ctx: IBotContext) =>
  ctx.scene.enter(ScenesNames.AddCarDescription)
);

stage.hears(buttonsValue.orderOriginalQualityBtn, (ctx: IBotContext) => {
  ctx.session.state.partsQuality = buttonsValue.orderOriginalQualityBtn;

  ctx.scene.enter(ScenesNames.ChooseOrderUrgency);
});

stage.hears(buttonsValue.orderCheapQualityBtn, (ctx: IBotContext) => {
  ctx.session.state.partsQuality = buttonsValue.orderCheapQualityBtn;

  ctx.scene.enter(ScenesNames.ChooseOrderUrgency);
});

stage.hears(buttonsValue.orderBaseQualityBtn, (ctx: IBotContext) => {
  ctx.session.state.partsQuality = buttonsValue.orderBaseQualityBtn;

  ctx.scene.enter(ScenesNames.ChooseOrderUrgency);
});

stage.hears(buttonsValue.lowUrgensyOrderBtn, (ctx: IBotContext) => {
  ctx.session.state.orderUrgency = buttonsValue.lowUrgensyOrderBtn;

  ctx.scene.enter(ScenesNames.CreateOrder);
});

stage.hears(buttonsValue.highUrgencyOrderBtn, (ctx: IBotContext) => {
  ctx.session.state.orderUrgency = buttonsValue.highUrgencyOrderBtn;

  ctx.scene.enter(ScenesNames.CreateOrder);
});

stage.command('/start', (ctx: IBotContext) =>
  ctx.scene.enter(ScenesNames.ChooseOrderCount)
);

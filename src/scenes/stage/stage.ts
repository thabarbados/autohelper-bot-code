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
  orderConfirmationScene,
} from '@src/scenes';
import { hasFilledField } from '@src/services';

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
  orderConfirmationScene,
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
  const { state } = ctx.session;

  state.deliveryType = buttonsValue.orderFromPointBtn;

  if (hasFilledField('deliveryAddress', state)) {
    state.deliveryAddress = '';
  }

  ctx.scene.enter(
    state.hasFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.AddCarInfoScene
  );
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
  const { state } = ctx.session;

  state.orderQuality = buttonsValue.orderOriginalQualityBtn;

  ctx.scene.enter(
    state.hasFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseOrderUrgency
  );
});

stage.hears(buttonsValue.orderCheapQualityBtn, (ctx: IBotContext) => {
  const { state } = ctx.session;

  state.orderQuality = buttonsValue.orderCheapQualityBtn;

  ctx.scene.enter(
    state.hasFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseOrderUrgency
  );
});

stage.hears(buttonsValue.orderBaseQualityBtn, (ctx: IBotContext) => {
  const { state } = ctx.session;

  state.orderQuality = buttonsValue.orderBaseQualityBtn;

  ctx.scene.enter(
    state.hasFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseOrderUrgency
  );
});

stage.hears(buttonsValue.lowUrgensyOrderBtn, (ctx: IBotContext) => {
  const { state } = ctx.session;

  state.orderUrgency = buttonsValue.lowUrgensyOrderBtn;

  if (!state.hasFilledOrder) {
    state.hasFilledOrder = true;
  }

  ctx.scene.enter(ScenesNames.OrderConfirmation);
});

stage.hears(buttonsValue.highUrgencyOrderBtn, (ctx: IBotContext) => {
  const { state } = ctx.session;

  state.orderUrgency = buttonsValue.highUrgencyOrderBtn;

  if (!state.hasFilledOrder) {
    state.hasFilledOrder = true;
  }

  ctx.scene.enter(ScenesNames.OrderConfirmation);
});

stage.hears(buttonsValue.changeOrderDescriptionBtn, (ctx: IBotContext) => {
  ctx.scene.enter(ScenesNames.AddOrderTextDescription);
});

stage.hears(buttonsValue.changeOrderPhotoBtn, (ctx: IBotContext) => {
  ctx.scene.enter(ScenesNames.AddOrderPhotoDescription);
});

stage.hears(buttonsValue.changeCarDocsPhotoBtn, (ctx: IBotContext) => {
  ctx.scene.enter(ScenesNames.AddCarDocsPhoto);
});

stage.hears(buttonsValue.changeCarVinNumberBtn, (ctx: IBotContext) => {
  ctx.scene.enter(ScenesNames.AddCarVinNumber);
});

stage.hears(buttonsValue.changeCarDescriptionBtn, (ctx: IBotContext) => {
  ctx.scene.enter(ScenesNames.AddCarDescription);
});

stage.hears(buttonsValue.changeDeliveryTypeBtn, (ctx: IBotContext) => {
  ctx.scene.enter(ScenesNames.ChooseDeliveryType);
});

stage.hears(buttonsValue.changeDeliveryAddressBtn, (ctx: IBotContext) => {
  ctx.scene.enter(ScenesNames.AddDeliveryAddress);
});

stage.hears(buttonsValue.changeOrderQuality, (ctx: IBotContext) => {
  ctx.scene.enter(ScenesNames.ChooseOrderQuality);
});

stage.hears(buttonsValue.changeOrderUrgency, (ctx: IBotContext) => {
  ctx.scene.enter(ScenesNames.ChooseOrderUrgency);
});

stage.hears(buttonsValue.confirmOrderBtn, (ctx: IBotContext) => {
  ctx.scene.enter(ScenesNames.CreateOrder);
});

stage.command('/start', (ctx: IBotContext) =>
  ctx.scene.enter(ScenesNames.ChooseOrderCount)
);

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
  const {
    setDeliveryType,
    deliveryAddress,
    setDeliveryAddress,
    isFilledOrder,
  } = ctx.session.state.orderModule;

  setDeliveryType(buttonsValue.orderFromPointBtn);

  if (deliveryAddress?.length > 0) {
    setDeliveryAddress('');
  }

  ctx.scene.enter(
    isFilledOrder ? ScenesNames.OrderConfirmation : ScenesNames.AddCarInfoScene
  );
});

stage.hears(buttonsValue.orderWithDeliveryBtn, (ctx: IBotContext) => {
  const { setDeliveryType } = ctx.session.state.orderModule;
  setDeliveryType(buttonsValue.orderWithDeliveryBtn);

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
  const { setOrderQuality, isFilledOrder } = ctx.session.state.orderModule;

  setOrderQuality(buttonsValue.orderOriginalQualityBtn);

  ctx.scene.enter(
    isFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseOrderUrgency
  );
});

stage.hears(buttonsValue.orderCheapQualityBtn, (ctx: IBotContext) => {
  const { setOrderQuality, isFilledOrder } = ctx.session.state.orderModule;

  setOrderQuality(buttonsValue.orderCheapQualityBtn);

  ctx.scene.enter(
    isFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseOrderUrgency
  );
});

stage.hears(buttonsValue.orderBaseQualityBtn, (ctx: IBotContext) => {
  const { setOrderQuality, isFilledOrder } = ctx.session.state.orderModule;

  setOrderQuality(buttonsValue.orderBaseQualityBtn);

  ctx.scene.enter(
    isFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseOrderUrgency
  );
});

stage.hears(buttonsValue.lowUrgensyOrderBtn, (ctx: IBotContext) => {
  const { setOrderUrgency, isFilledOrder, setOrderFilledStatus } =
    ctx.session.state.orderModule;

  setOrderUrgency(buttonsValue.lowUrgensyOrderBtn);

  if (!isFilledOrder) {
    setOrderFilledStatus(true);
  }

  ctx.scene.enter(ScenesNames.OrderConfirmation);
});

stage.hears(buttonsValue.highUrgencyOrderBtn, (ctx: IBotContext) => {
  const { setOrderUrgency, isFilledOrder, setOrderFilledStatus } =
    ctx.session.state.orderModule;

  setOrderUrgency(buttonsValue.highUrgencyOrderBtn);

  if (!isFilledOrder) {
    setOrderFilledStatus(true);
  }

  ctx.scene.enter(ScenesNames.OrderConfirmation);
});

stage.hears(buttonsValue.changeOrderDescriptionBtn, (ctx: IBotContext) => {
  ctx.scene.enter(ScenesNames.AddOrderTextDescription);
});

stage.hears(buttonsValue.changeOrderPhotoBtn, (ctx: IBotContext) => {
  const { setOrderPhotoUrls } = ctx.session.state.orderModule;
  const { setOrderPhotoLoadingStatus } = ctx.session.state.scenesModule;

  setOrderPhotoUrls([]);
  setOrderPhotoLoadingStatus(false);

  ctx.scene.enter(ScenesNames.AddOrderPhotoDescription);
});

stage.hears(buttonsValue.changeCarDocsPhotoBtn, (ctx: IBotContext) => {
  const { setCarDocsPhotoUrls } = ctx.session.state.orderModule;
  const { setCarDocsPhotoLoadingStatus } = ctx.session.state.scenesModule;

  setCarDocsPhotoUrls([]);
  setCarDocsPhotoLoadingStatus(false);

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

import { Markup, Scenes } from 'telegraf';

import { IBotContext } from '@src/domain';
import { ScenesNames, buttonsValue, botTexts } from '@src/configs';

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
  switchScene,
  startNextOrderScene,
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
  startNextOrderScene,
]);

stage.hears(buttonsValue.multipleOrdersBtn, (ctx: IBotContext) =>
  switchScene(ctx, ScenesNames.MultipleOrdersNotice)
);

stage.hears(
  [buttonsValue.singleOrderBtn, buttonsValue.multipleOrdersOKBtn],
  (ctx: IBotContext) => switchScene(ctx, ScenesNames.ChooseOrderDescriptionType)
);

stage.hears(buttonsValue.addPhotoDescriptionBtn, (ctx: IBotContext) =>
  switchScene(ctx, ScenesNames.AddOrderPhotoDescription)
);

stage.hears(buttonsValue.addTextDescriptionBtn, (ctx: IBotContext) =>
  switchScene(ctx, ScenesNames.AddOrderTextDescription)
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

  switchScene(
    ctx,
    isFilledOrder ? ScenesNames.OrderConfirmation : ScenesNames.AddCarInfoScene
  );
});

stage.hears(buttonsValue.orderWithDeliveryBtn, (ctx: IBotContext) => {
  const { setDeliveryType } = ctx.session.state.orderModule;
  setDeliveryType(buttonsValue.orderWithDeliveryBtn);

  switchScene(ctx, ScenesNames.AddDeliveryAddress);
});

stage.hears(buttonsValue.addCarDocsPhotoBtn, (ctx: IBotContext) =>
  switchScene(ctx, ScenesNames.AddCarDocsPhoto)
);

stage.hears(buttonsValue.addCarVinNumberBtn, (ctx: IBotContext) =>
  switchScene(ctx, ScenesNames.AddCarVinNumber)
);

stage.hears(buttonsValue.addCarDescriptionBtn, (ctx: IBotContext) =>
  switchScene(ctx, ScenesNames.AddCarDescription)
);

stage.hears(buttonsValue.orderOriginalQualityBtn, (ctx: IBotContext) => {
  const { setOrderQuality, isFilledOrder } = ctx.session.state.orderModule;

  setOrderQuality(buttonsValue.orderOriginalQualityBtn);

  switchScene(
    ctx,
    isFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseOrderUrgency
  );
});

stage.hears(buttonsValue.orderCheapQualityBtn, (ctx: IBotContext) => {
  const { setOrderQuality, isFilledOrder } = ctx.session.state.orderModule;

  setOrderQuality(buttonsValue.orderCheapQualityBtn);

  switchScene(
    ctx,
    isFilledOrder
      ? ScenesNames.OrderConfirmation
      : ScenesNames.ChooseOrderUrgency
  );
});

stage.hears(buttonsValue.orderBaseQualityBtn, (ctx: IBotContext) => {
  const { setOrderQuality, isFilledOrder } = ctx.session.state.orderModule;

  setOrderQuality(buttonsValue.orderBaseQualityBtn);

  switchScene(
    ctx,
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

  switchScene(ctx, ScenesNames.OrderConfirmation);
});

stage.hears(buttonsValue.highUrgencyOrderBtn, (ctx: IBotContext) => {
  const { setOrderUrgency, isFilledOrder, setOrderFilledStatus } =
    ctx.session.state.orderModule;

  setOrderUrgency(buttonsValue.highUrgencyOrderBtn);

  if (!isFilledOrder) {
    setOrderFilledStatus(true);
  }

  switchScene(ctx, ScenesNames.OrderConfirmation);
});

stage.hears(buttonsValue.changeOrderDescriptionBtn, (ctx: IBotContext) => {
  switchScene(ctx, ScenesNames.AddOrderTextDescription);
});

stage.hears(buttonsValue.changeOrderPhotoBtn, (ctx: IBotContext) => {
  const { setOrderPhotoUrls } = ctx.session.state.orderModule;
  const { setOrderPhotoLoadingStatus } = ctx.session.state.scenesModule;

  setOrderPhotoUrls([]);
  setOrderPhotoLoadingStatus(false);

  switchScene(ctx, ScenesNames.AddOrderPhotoDescription);
});

stage.hears(buttonsValue.changeCarDocsPhotoBtn, (ctx: IBotContext) => {
  const { setCarDocsPhotoUrls } = ctx.session.state.orderModule;
  const { setCarDocsPhotoLoadingStatus } = ctx.session.state.scenesModule;

  setCarDocsPhotoUrls([]);
  setCarDocsPhotoLoadingStatus(false);

  switchScene(ctx, ScenesNames.AddCarDocsPhoto);
});

stage.hears(buttonsValue.changeCarVinNumberBtn, (ctx: IBotContext) => {
  switchScene(ctx, ScenesNames.AddCarVinNumber);
});

stage.hears(buttonsValue.changeCarDescriptionBtn, (ctx: IBotContext) => {
  switchScene(ctx, ScenesNames.AddCarDescription);
});

stage.hears(buttonsValue.changeDeliveryTypeBtn, (ctx: IBotContext) => {
  switchScene(ctx, ScenesNames.ChooseDeliveryType);
});

stage.hears(buttonsValue.changeDeliveryAddressBtn, (ctx: IBotContext) => {
  switchScene(ctx, ScenesNames.AddDeliveryAddress);
});

stage.hears(buttonsValue.changeOrderQuality, (ctx: IBotContext) => {
  switchScene(ctx, ScenesNames.ChooseOrderQuality);
});

stage.hears(buttonsValue.changeOrderUrgency, (ctx: IBotContext) => {
  switchScene(ctx, ScenesNames.ChooseOrderUrgency);
});

stage.hears(buttonsValue.confirmOrderBtn, (ctx: IBotContext) => {
  switchScene(ctx, ScenesNames.CreateOrder);
});

stage.hears(buttonsValue.startNextOrder, (ctx: IBotContext) => {
  switchScene(ctx, ScenesNames.ChooseOrderCount);
});

stage.hears(buttonsValue.stopCreateOrders, (ctx: IBotContext) => {
  ctx.reply(botTexts.stopCreateOrdersNotice, Markup.removeKeyboard());
});

stage.command('/start', (ctx: IBotContext) =>
  switchScene(ctx, ScenesNames.ChooseOrderCount)
);

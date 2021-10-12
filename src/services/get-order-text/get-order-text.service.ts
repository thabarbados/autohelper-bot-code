import { IOrderModule } from '@src/domain';

export const getOrderText = (
  orderData: IOrderModule,
  returnType: 'defaultText' | 'textWithUserInfo'
) => {
  const {
    userName,
    userNickname,
    userChatId,
    orderTextDescription,
    deliveryType,
    deliveryAddress,
    carVinNumber,
    carDescription,
    orderQuality,
    orderUrgency,
  } = orderData;

  return `${
    returnType === 'textWithUserInfo'
      ? `🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗\n<strong>Внимание, поступил новый заказ.</strong>\n<strong>Заказ сделал</strong> ${
          userName?.length > 0 ? userName : 'пользователь'
        }${
          userNickname?.length > 0
            ? `, его аккаунт в телеграме: @${userNickname}.`
            : ''
        }\n<strong>ID чата</strong>: ${userChatId}.\n`
      : ''
  }${
    orderTextDescription?.length > 0
      ? `<strong>Описание запчасти</strong>: ${orderTextDescription}.\n`
      : ''
  }${`<strong>Тип доставки</strong>: ${deliveryType}. ${
    deliveryAddress?.length > 0
      ? `Доставку нужно осуществить по адресу: ${deliveryAddress}`
      : ''
  }`}\n${
    carVinNumber?.length > 0
      ? `<strong>VIN номер автомобиля</strong>: ${carVinNumber}.\n`
      : ''
  }${
    carDescription?.length > 0
      ? `<strong>Дополнительная информация о автомобиле</strong>: ${carDescription}.\n`
      : ''
  }<strong>Качество запчасти</strong>: ${orderQuality}.\n<strong>Срочность заказа</strong>: ${orderUrgency}.`;
};

import { IBotState } from '../../domain';

export function getOrderText(state: IBotState) {
  const {
    userName,
    userNickname,
    userChatId,
    orderTextDescription,
    deliveryType,
    deliveryAddress,
    autoVinNumber,
    autoParams,
    partsQuality,
    orderUrgency,
  } = state;

  return `🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗\n<strong>Внимание, поступил новый заказ.</strong>\n<strong>Заказ сделал</strong> ${
    userName.length > 0 ? userName : 'пользователь'
  }${
    userNickname.length > 0
      ? `, его аккаунт в телеграме: @${userNickname}.`
      : ''
  }\n<strong>ID чата</strong>: ${userChatId}.\n${
    orderTextDescription.length > 0
      ? `<strong>Заказчик добавил описание запчасти</strong>: ${orderTextDescription}.\n`
      : ''
  }${`<strong>Выбран тип доставки</strong>: ${deliveryType}. ${
    deliveryAddress.length > 0
      ? `Доставку нужно осуществить по адресу: ${deliveryAddress}`
      : ''
  }`}\n${
    autoVinNumber.length > 0
      ? `<strong>VIN номер автомобиля</strong>: ${autoVinNumber}.\n`
      : ''
  }${
    autoParams.length > 0
      ? `<strong>Дополнительная информация о автомобиле</strong>: ${autoParams}.\n`
      : ''
  }<strong>Выбрано качество запчасти</strong>: ${partsQuality}.\n<strong>Срочность заказа</strong>: ${orderUrgency}.`;
}

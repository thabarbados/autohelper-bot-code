import { IBotState } from '@src/domain';
import { hasFilledField } from '@src/services';
import { botTexts } from '@src/configs';

export const getOrderText = (state: IBotState, withUserInfo: boolean) => {
  if (state === undefined) {
    return botTexts.errorText;
  }

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
  } = state;

  return `${
    withUserInfo
      ? `🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗\n<strong>Внимание, поступил новый заказ.</strong>\n<strong>Заказ сделал</strong> ${
          hasFilledField('userName', state) ? userName : 'пользователь'
        }${
          hasFilledField('userNickName', state)
            ? `, его аккаунт в телеграме: @${userNickname}.`
            : ''
        }\n<strong>ID чата</strong>: ${userChatId}.\n`
      : ''
  }${
    hasFilledField('orderTextDescription', state)
      ? `<strong>Описание запчасти</strong>: ${orderTextDescription}.\n`
      : ''
  }${`<strong>Тип доставки</strong>: ${deliveryType}. ${
    hasFilledField('deliveryAddress', state)
      ? `Доставку нужно осуществить по адресу: ${deliveryAddress}`
      : ''
  }`}\n${
    hasFilledField('carVinNumber', state)
      ? `<strong>VIN номер автомобиля</strong>: ${carVinNumber}.\n`
      : ''
  }${
    hasFilledField('carDescription', state)
      ? `<strong>Дополнительная информация о автомобиле</strong>: ${carDescription}.\n`
      : ''
  }<strong>Качество запчасти</strong>: ${orderQuality}.\n<strong>Срочность заказа</strong>: ${orderUrgency}.`;
};

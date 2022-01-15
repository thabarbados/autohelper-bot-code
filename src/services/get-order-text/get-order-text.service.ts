import { IOrderModule } from '@src/domain';
import { confirmOrderTexts } from '@src/configs';

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
      ? `🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗\n<strong>${
          confirmOrderTexts.newOrderPreview
        }.</strong>\n<strong>${confirmOrderTexts.customerPreview}</strong> ${
          userName?.length > 0 ? userName : confirmOrderTexts.userPreview
        }${
          userNickname?.length > 0
            ? `, ${confirmOrderTexts.userTgIdPreview}: @${userNickname}.`
            : ''
        }\n<strong>${
          confirmOrderTexts.chatIdPreview
        }</strong>: ${userChatId}.\n`
      : ''
  }${
    orderTextDescription?.length > 0
      ? `<strong>${confirmOrderTexts.partDescriptionPreview}</strong>: ${orderTextDescription}.\n`
      : ''
  }${`<strong>${
    confirmOrderTexts.orderTypePreview
  }</strong>: ${deliveryType}. ${
    deliveryAddress?.length > 0
      ? `${confirmOrderTexts.orderAddressPreview}: ${deliveryAddress}`
      : ''
  }`}\n${
    carVinNumber?.length > 0
      ? `<strong>${confirmOrderTexts.carIdPreview}</strong>: ${carVinNumber}.\n`
      : ''
  }${
    carDescription?.length > 0
      ? `<strong>${confirmOrderTexts.carAdditionalInfoPreview}</strong>: ${carDescription}.\n`
      : ''
  }<strong>${
    confirmOrderTexts.partQualityPreview
  }</strong>: ${orderQuality}.\n<strong>${
    confirmOrderTexts.orderUrgencyPreview
  }</strong>: ${orderUrgency}.`;
};

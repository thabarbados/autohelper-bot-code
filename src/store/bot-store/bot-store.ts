import { IBotState } from '@src/domain/types/types';

export const botState: IBotState = Object.freeze({
  isMultipleOrder: false,
  hasFilledOrder: false,
  startLoadPhotoDescriptionTime: 0n,
  startLoadCarDocsPhotoTime: 0n,
  hasShowChooseDeliveryTypeSceneAction: false,
  hasShowChooseOrderQualitySceneAction: false,
  userName: '',
  userSurname: '',
  userNickname: '',
  userChatId: 0,
  orderPhotoUrls: [],
  orderTextDescription: '',
  deliveryType: '',
  deliveryAddress: '',
  carDocsPhotoUrls: [],
  carVinNumber: '',
  carDescription: '',
  orderQuality: '',
  orderUrgency: '',
});

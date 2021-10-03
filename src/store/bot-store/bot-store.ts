import { IBotState } from '@src/domain/types/types';

export const botState: IBotState = {
  isMultipleOrder: false,
  userName: '',
  userSurname: '',
  userNickname: '',
  userChatId: 0,
  orderPhotoUrl: '',
  orderTextDescription: '',
  deliveryType: '',
  deliveryAddress: '',
  autoDocPhotoUrl: '',
  autoVinNumber: '',
  autoParams: '',
  partsQuality: '',
  orderUrgency: '',
};

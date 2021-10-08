import { IBotState } from '@src/domain/types/types';

export const botState: IBotState = {
  isMultipleOrder: false,
  hasFilledOrder: false,
  userName: '',
  userSurname: '',
  userNickname: '',
  userChatId: 0,
  orderPhotoUrl: '',
  orderTextDescription: '',
  deliveryType: '',
  deliveryAddress: '',
  carDocsPhotoUrl: '',
  carVinNumber: '',
  carDescription: '',
  orderQuality: '',
  orderUrgency: '',
};

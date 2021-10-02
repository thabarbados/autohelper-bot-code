export interface IBotState {
  isMultipleOrder: boolean;
  userName: string;
  userSurname: string;
  userNickname: string;
  userChatId: number;
  orderPhotoUrl: string;
  orderTextDescription: string;
  deliveryType: string;
  deliveryAddress: string;
  autoDocPhotoUrl: string;
  autoVinNumber: string;
  autoParams: string;
  partsQuality: string;
  orderUrgency: string;
}

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

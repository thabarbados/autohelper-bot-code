export interface IOrderModule {
  readonly isMultipleOrder: boolean;
  readonly isFilledOrder: boolean;

  readonly userName: string;
  readonly userSurname: string;
  readonly userNickname: string;
  readonly userChatId: number;
  readonly orderPhotoUrls: string[];
  readonly orderTextDescription: string;
  readonly deliveryType: string;
  readonly deliveryAddress: string;
  readonly carDocsPhotoUrls: string[];
  readonly carVinNumber: string;
  readonly carDescription: string;
  readonly orderQuality: string;
  readonly orderUrgency: string;

  setOrderMultipleStatus(isMultiple: boolean): void;
  setOrderFilledStatus(isFilled: boolean): void;
  setUserName(name: string): void;
  setUserSurname(surname: string): void;
  setUserNickname(nickname: string): void;
  setUserChatId(chatId: number): void;
  setOrderPhotoUrls(photoUrls: string[]): void;
  setOrderTextDescription(description: string): void;
  setDeliveryType(type: string): void;
  setDeliveryAddress(address: string): void;
  setCarDocsPhotoUrls(photoUrls: string[]): void;
  setCarVinNumber(vinNumber: string): void;
  setCarDescription(description: string): void;
  setOrderQuality(quality: string): void;
  setOrderUrgency(urgency: string): void;
}

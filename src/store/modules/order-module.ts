import { IOrderModule } from '@src/domain';

export class OrderModule implements IOrderModule {
  private _isMultipleOrder: boolean = false;
  private _isFilledOrder: boolean = false;

  private _userName: string = '';
  private _userSurname: string = '';
  private _userNickname: string = '';
  private _userChatId: number = 0;
  private _orderPhotoUrls: string[] = [];
  private _orderTextDescription: string = '';
  private _deliveryType: string = '';
  private _deliveryAddress: string = '';
  private _carDocsPhotoUrls: string[] = [];
  private _carVinNumber: string = '';
  private _carDescription: string = '';
  private _orderQuality: string = '';
  private _orderUrgency: string = '';

  constructor() {}

  public get isMultipleOrder(): boolean {
    return this._isMultipleOrder;
  }

  public get isFilledOrder(): boolean {
    return this._isFilledOrder;
  }

  public get userName(): string {
    return this._userName;
  }

  public get userSurname(): string {
    return this._userSurname;
  }

  public get userNickname(): string {
    return this._userNickname;
  }

  public get userChatId(): number {
    return this._userChatId;
  }

  public get orderPhotoUrls(): string[] {
    return this._orderPhotoUrls;
  }

  public get orderTextDescription(): string {
    return this._orderTextDescription;
  }

  public get deliveryType(): string {
    return this._deliveryType;
  }

  public get deliveryAddress(): string {
    return this._deliveryAddress;
  }

  public get carDocsPhotoUrls(): string[] {
    return this._carDocsPhotoUrls;
  }

  public get carVinNumber(): string {
    return this._carVinNumber;
  }

  public get carDescription(): string {
    return this._carDescription;
  }

  public get orderQuality(): string {
    return this._orderQuality;
  }

  public get orderUrgency(): string {
    return this._orderUrgency;
  }

  public setOrderMultipleStatus = (isMultiple: boolean): void => {
    this._isMultipleOrder = isMultiple;
  };

  public setOrderFilledStatus = (isFilled: boolean): void => {
    this._isFilledOrder = isFilled;
  };

  public setUserName = (name: string): void => {
    this._userName = name;
  };

  public setUserSurname = (surname: string): void => {
    this._userSurname = surname;
  };

  public setUserNickname = (nickname: string): void => {
    this._userNickname = nickname;
  };

  public setUserChatId = (chatid: number): void => {
    this._userChatId = chatid;
  };

  public setOrderPhotoUrls = (photoUrls: string[]): void => {
    this._orderPhotoUrls = photoUrls;
  };

  public setOrderTextDescription = (description: string): void => {
    this._orderTextDescription = description;
  };

  public setDeliveryType = (type: string): void => {
    this._deliveryType = type;
  };

  public setDeliveryAddress = (address: string): void => {
    this._deliveryAddress = address;
  };

  public setCarDocsPhotoUrls = (photoUrls: string[]): void => {
    this._carDocsPhotoUrls = photoUrls;
  };

  public setCarVinNumber = (vinNumber: string): void => {
    this._carVinNumber = vinNumber;
  };

  public setCarDescription = (description: string): void => {
    this._carDescription = description;
  };

  public setOrderQuality = (quality: string): void => {
    this._orderQuality = quality;
  };

  public setOrderUrgency = (urgency: string): void => {
    this._orderUrgency = urgency;
  };
}

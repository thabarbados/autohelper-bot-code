import { IAdminModule } from '@src/domain';

export class AdminModule implements IAdminModule {
  private _clientChatId: string = '';
  private _messageText: string = '';
  private _messagePhotoUrls: string[] = [];

  constructor() {}

  public get clientChatId(): string {
    return this._clientChatId;
  }

  public get messageText(): string {
    return this._messageText;
  }

  public get messagePhotoUrls(): string[] {
    return this._messagePhotoUrls;
  }

  public setClientChatId = (id: string): void => {
    this._clientChatId = id;
  };

  public setMessageText = (text: string) => {
    this._messageText = text;
  };

  public setMessagePhotoUrls = (urls: string[]) => {
    this._messagePhotoUrls = urls;
  };
}

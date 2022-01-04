export interface IAdminModule {
  readonly clientChatId: string;
  readonly messageText: string;
  readonly messagePhotoUrls: string[];

  setClientChatId(id: string): void;
  setMessageText(text: string): void;
  setMessagePhotoUrls(urls: string[]): void;
}

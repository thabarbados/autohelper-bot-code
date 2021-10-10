import { Context, Scenes } from 'telegraf';

export interface IBotState {
  isMultipleOrder: boolean;
  hasFilledOrder: boolean;
  startLoadPhotoDescriptionTime: bigint;
  startLoadCarDocsPhotoTime: bigint;
  hasShowChooseDeliveryTypeSceneAction: boolean;
  hasShowChooseOrderQualitySceneAction: boolean;
  userName: string;
  userSurname: string;
  userNickname: string;
  userChatId: number;
  orderPhotoUrls: string[];
  orderTextDescription: string;
  deliveryType: string;
  deliveryAddress: string;
  carDocsPhotoUrls: string[];
  carVinNumber: string;
  carDescription: string;
  orderQuality: string;
  orderUrgency: string;
}

export interface IBotSession extends Scenes.SceneSession {
  state: IBotState;
}

export interface IBotContext extends Context {
  session: IBotSession;
  scene: Scenes.SceneContextScene<IBotContext>;
}

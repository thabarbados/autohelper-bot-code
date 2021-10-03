import { Context, Scenes } from "telegraf";

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

export interface IBotSession extends Scenes.SceneSession {
  state: IBotState;
}

export interface IBotContext extends Context {
  session: IBotSession;
  scene: Scenes.SceneContextScene<IBotContext>;
}

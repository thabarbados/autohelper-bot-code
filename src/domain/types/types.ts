import { Context, Scenes } from 'telegraf';
import { IOrderModule, IScenesModule, IAdminModule } from '@src/domain';

export interface IBotState {
  orderModule: IOrderModule;
  scenesModule: IScenesModule;
}

export interface IBotSession extends Scenes.SceneSession {
  state: IBotState;
  admin: IAdminModule;
}

export interface IBotContext extends Context {
  session: IBotSession;
  scene: Scenes.SceneContextScene<IBotContext>;
}

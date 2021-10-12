import { IBotState, IOrderModule, IScenesModule } from '@src/domain';
import { OrderModule, ScenesModule } from '@src/store';

export class BotModule implements IBotState {
  private _orderModule: IOrderModule;
  private _scenesModule: IScenesModule;

  constructor() {
    this._orderModule = new OrderModule();
    this._scenesModule = new ScenesModule();
  }

  public get orderModule(): IOrderModule {
    return this._orderModule;
  }

  public get scenesModule(): IScenesModule {
    return this._scenesModule;
  }
}

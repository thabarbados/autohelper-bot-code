import { IBotContext } from '@src/domain';
import { SceneName } from '@src/configs';

export const switchScene = (ctx: IBotContext, sceneName: SceneName) =>
  ctx.scene.enter(sceneName);

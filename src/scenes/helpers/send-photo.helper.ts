import { IBotContext } from '@src/domain';

export const sendPhotoToChat = async (
  ctx: IBotContext,
  id: string,
  url: string,
  caption: string
) => await ctx.telegram.sendPhoto(id, { url }, { caption });

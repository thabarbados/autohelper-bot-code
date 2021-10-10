import { IBotContext } from '@src/domain';

export const sendPhotoToChat = async (
  ctx: IBotContext,
  id: string,
  urls: string[],
  caption: string
) => {
  if (urls.length > 0) {
    for (const url of urls) {
      await ctx.telegram.sendPhoto(id, { url }, { caption });
    }
  }
};

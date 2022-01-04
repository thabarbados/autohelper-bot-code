import { IOrderModule } from '@src/domain';

export const createClientAnswer = (
  chatId: IOrderModule['userChatId'],
  message: string
) => {
  return `Пользователь из чата <strong>${chatId}</strong> написал сообщение: ${message}`;
};

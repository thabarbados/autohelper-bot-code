import { IAdminModule } from '@src/domain';

export const getClientMessage = (data: IAdminModule) => {
  return `Действительно хочешь отправить клиенту с ID чата ${
    data.clientChatId
  } ${
    data.messageText.length > 0
      ? `сообщение:\n ${data.messageText}`
      : `фото: ${data.messagePhotoUrls[0]}`
  } `;
};

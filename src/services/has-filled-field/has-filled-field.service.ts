import { IBotState } from '@src/domain';

export type StoreFields =
  | 'userName'
  | 'userNickName'
  | 'userChatId'
  | 'orderTextDescription'
  | 'orderPhoto'
  | 'deliveryAddress'
  | 'carVinNumber'
  | 'carDocsPhoto'
  | 'carDescription';

export function hasFilledField(field: StoreFields, state: IBotState): boolean {
  if (field === 'userName') {
    return 'userName' in state && state.userName.length > 0;
  }

  if (field === 'userNickName') {
    return 'userNickName' in state && state.userNickname.length > 0;
  }

  if (field === 'userChatId') {
    return 'userChatId' in state && state.userChatId > 0;
  }

  if (field === 'orderTextDescription') {
    return 'orderTextDescription' in state && state.orderTextDescription.length > 0;
  }

  if (field === 'orderPhoto') {
    return 'orderPhoto' in state && state.orderPhotoUrl.length > 0;
  }

  if (field === 'deliveryAddress') {
    return 'deliveryAddress' in state && state.deliveryAddress.length > 0;
  }

  if (field === 'carDescription') {
    return 'carDescription' in state && state.carDescription.length > 0;
  }

  if (field === 'carVinNumber') {
    return 'carVinNumber' in state && state.carVinNumber.length > 0;
  }

  if (field === 'carDocsPhoto') {
    return 'carDocsPhoto' in state && state.carDocsPhotoUrl.length > 0;
  }

  return false;
}

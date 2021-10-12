export enum ScenesNames {
  ChooseOrderCount = 'chooseOrderCount',
  MultipleOrdersNotice = 'multipleOrdersNotice',
  ChooseOrderDescriptionType = 'chooseOrderDescriptionType',
  AddOrderPhotoDescription = 'addOrderPhotoDescription',
  AddOrderTextDescription = 'addOrderTextDescription',
  ChooseDeliveryType = 'chooseDeliveryType',
  AddDeliveryAddress = 'addDeliveryAddress',
  AddCarInfoScene = 'addCarInfoScene',
  AddCarDocsPhoto = 'addCarDocsPhoto',
  AddCarVinNumber = 'addCarVinNumber',
  AddCarDescription = 'addCarDescription',
  ChooseOrderQuality = 'chooseOrderQuality',
  ChooseOrderUrgency = 'chooseOrderUrgency',
  OrderConfirmation = 'orderConfirmation',
  CreateOrder = 'createOrder',
}

export type SceneName =
  | ScenesNames.AddCarDocsPhoto
  | ScenesNames.AddCarInfoScene
  | ScenesNames.AddCarVinNumber
  | ScenesNames.AddDeliveryAddress
  | ScenesNames.AddOrderPhotoDescription
  | ScenesNames.AddOrderTextDescription
  | ScenesNames.ChooseDeliveryType
  | ScenesNames.ChooseOrderCount
  | ScenesNames.ChooseOrderDescriptionType
  | ScenesNames.ChooseOrderQuality
  | ScenesNames.ChooseOrderUrgency
  | ScenesNames.CreateOrder
  | ScenesNames.MultipleOrdersNotice
  | ScenesNames.OrderConfirmation
  | ScenesNames.AddCarDescription;

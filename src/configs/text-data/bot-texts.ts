export const botTexts = Object.freeze({
  welcomeString: function (name: string) {
    return `Привет ${name}! С моей помощью ты можешь найти любую запчасть в Новосибирске. Тебе нужна одна запчасть или несколько?`;
  },
  defaultUserName: 'автолюбитель',
  fewPartsNote:
    'Для этого тебе нужно будет сделать заказ на каждую запчасть отдельно.',
  chooseOrderDescriptionTypeNote: 'Расскажи какую запчасть ты ищешь:',
  addPhotoDescriptionNote:
    'Нажмите на 📎, выберите фото запчасти или сделайте его, и отправьте его мне',
  addTextDescriptionNote:
    'Введите описание необходимой запчасти и отправьте его мне',
  chooseDeliveryTypeNote: 'Нужна доставка?',
  deliveryAddressNote: 'Введите адрес для доставки и отправьте его мне ',
  addAutoInfoNote: 'Добавьте информацию об авто',
  addAutoDocPhotoNote:
    'Нажмите на 📎, выберите фото ПТС или сделайте его, и отправьте его мне',
  addAutoVinNumberNote: 'Введите VIN номер авто и отправьте его мне',
  addAutoDescriptionNote:
    'Введите VIN, номер кузова, год выпуска, объем и модель ДВС, тип КПП, тип привода, комплектацию и отправьте эту информацию мне',
  partsQualityNote:
    'Укажите ваши предпочтения по качеству требующихся запчасте:',
  orderUrgencyNote: 'Выберите срочность заказа:',
  fullOrderDataNote:
    'Ваша заявка запущена в работу. Я свяжусь с вами при получении новой информации',
  orderPhotoText: 'Фото запчасти',
  orderCarDocPhotoText: 'Фото ПТС автомобиля',
});

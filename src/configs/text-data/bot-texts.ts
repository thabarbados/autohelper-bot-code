export const botTexts = Object.freeze({
  welcomeMessage: function (name: string) {
    return `Привет ${name}! С моей помощью ты можешь найти любую запчасть в Новосибирске. Тебе нужны запчасти для одного автомобиля??`;
  },
  defaultUserName: 'автолюбитель',
  multipleOrdersNotice:
    'Для этого тебе нужно будет сделать заказ на каждый автомобиль отдельно.',
  chooseOrderDescriptionTypeNote: 'Расскажи какие запчасти, расходники и масла ты ищешь:',
  addPhotoDescriptionNote:
    'Нажми на 📎, выбери фото запчасти или сделай его, и отправь его мне',
  addTextDescriptionNote:
    'Введи описание необходимой запчасти и отправь его мне',
  chooseDeliveryTypeNote: 'Нужна доставка?',
  addDeliveryAddressNote: 'Введи адрес для доставки и отправь его мне ',
  addCarInfoNote: 'Добавь информацию об авто',
  addCarDocsPhotoNote:
    'Нажми на 📎, выбери фото ПТС или сделай его, и отправь его мне',
  addCarVinNumberNote: 'Введи VIN номер авто и отправь его мне',
  addCarDescriptionNote:
    'Введи VIN, номер кузова, год выпуска, объем и модель ДВС, тип КПП, тип привода, комплектацию и отправь эту информацию мне',
  chooseOrderQualityNote:
    'Укажи предпочтения по качеству требующихся запчасте:',
  chooseOrderUrgencyNote: 'Какая срочность заказа:',
  createOrderNotice:
    'Заявка запущена в работу. Я свяжусь с тобой после подбора или для уточнения деталей.',
  orderPhotoCaption: 'Фото запчасти',
  orderCarDocsPhotoCaption: 'Фото ПТС автомобиля',
  unexpectedTextNote: 'Сейчас не нужно ничего вводить, выбери подходящий вариант из кнопок ниже.',
});

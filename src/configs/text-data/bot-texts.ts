export const botTexts = Object.freeze({
  welcomeMessage: function (name: string) {
    return `Привет ${name}! С моей помощью ты можешь найти любую запчасть в Новосибирске. Тебе нужны запчасти для одного автомобиля??`;
  },
  defaultUserName: 'автолюбитель',
  multipleOrdersNotice:
    'Для этого тебе нужно будет сделать заказ на каждый автомобиль отдельно.',
  chooseOrderDescriptionTypeNote:
    'Расскажи какие запчасти, расходники и масла ты ищешь:',
  addPhotoDescriptionNote:
    'Нажми на 📎, выбери фото необходимого или сделай его, и отправь его мне',
  addTextDescriptionNote: 'Введи описание необходимого и отправь его мне',
  chooseDeliveryTypeNote: 'Нужна доставка?',
  addDeliveryAddressNote: 'Введи адрес для доставки и отправь его мне ',
  addCarInfoNote: 'Добавь информацию об авто',
  addCarDocsPhotoNote:
    'Нажми на 📎, выбери фото ПТС или сделай его, и отправь его мне',
  addCarVinNumberNote: 'Введи VIN номер авто и отправь его мне',
  addCarDescriptionNote:
    'Введи VIN, номер кузова, год выпуска, объем и модель ДВС, тип КПП, тип привода, комплектацию и отправь эту информацию мне',
  chooseOrderQualityNote:
    'Укажи предпочтения по качеству требующихся запчастей:',
  chooseOrderUrgencyNote: 'Какая срочность заказа:',
  createOrderNotice:
    'Заявка запущена в работу. Я свяжусь с тобой после подбора или для уточнения деталей.',
  orderPhotoCaption: 'Фото запчасти',
  orderCarDocsPhotoCaption: 'Фото ПТС автомобиля',
  unexpectedTextWithButton:
    'Сейчас не нужно ничего вводить, выбери подходящий вариант ниже. Если дополнительная клавиатура отсутствует - нажми на иконку 🔠 в строке ввода.',
  unexpectedTextWithChooseFile:
    'Сейчас не нужно ничего вводить, нажми на 📎 и выбери фото.',
  unexpectedTextWithBotAnswer:
    'Сейчас не нужно ничего вводить, дождись ответа от бота.',
  confirmOrderTitle:
    'Отлично, ты почти сделал заказ. Давай проверим корректность введенных данных.',
  confirmOrderNotice:
    'Подтверди введенные данные или выбери что нужно изменить:',
  errorText: 'Произошла ошибка. Пожалуйста, попробуй сделать заказ заново.',
  startNextOrderNotice: 'Сделаем заказ на следующий автомобиль?',
  stopCreateOrdersNotice:
    'Напоминаю, что ты всегда можешь сделать новый заказ с выбрав команду /start',
  addClientChatIdNotice:
    'Введи ID чата с клиентом, которому ты хочешь отправить сообщение',
  addClientMessageDataNotice:
    'Введи сообщение или добавь фото, которое хочешь отправить клиенту',
  stopSendClientMessageNotice: 'Отправка сообщения отменена',
  sendClientMessageNotice: 'Сообщение отправлено заказчику',
  sendClientMessageHint: 'Если хочешь уточнить детали заказа и отправить сообщение клиенту введи команду /answer'
});

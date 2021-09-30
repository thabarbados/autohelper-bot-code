exports.actionsNames = {
  welcomeString: function (name) {
    return `Привет ${name}! С моей помощью ты можешь найти любую запчасть в Новосибирске. Тебе нужна одна запчасть или несколько?`;
  },
  defaultUserName: "автолюбитель",
  singleOrder: "Хочу заказать одну запчасть.",
  multipleOrders: "Мне нужно несколько запчастей.",
  fewPartsNote:
    "Для этого тебе нужно будет сделать заказ на каждую запчасть отдельно.",
  multipleOrdersHint: "Понятно!",
  chooseOrderDescriptionTypeNote: "Расскажи какую запчасть ты ищешь:",
  addPhotoDescription: "Добавить фото:",
  addTextDescription: "Добавить описание:",
  addPhotoDescriptionNote:
    "Нажмите на 📎, выберите фото запчасти или сделайте его, и отправьте его мне",
  addTextDescriptionNote:
    "Введите описание необходимой запчасти и отправьте его мне",
  chooseDeliveryTypeNote: "Нужна доставка?",
  selfOrderPickUp: "Соберу у поставщиков по городу",
  pointOrderPickUp: "Заберу готовый заказ в точке выдачи",
  orderWithDelivery: "Нужна доставка",
  deliveryAddressNote: "Введите адрес для доставки и отправьте его мне ",
  addAutoInfoNote: "Добавьте информацию об авто",
  addAutoDocPhotoTitle: "Добавить фото ПТС",
  addAutoVinNumberTitle: "Добавить VIN номер",
  addAutoDescriptionTitle: "Добавить дополнительные параметры",
  addAutoDocPhotoNote:
    "Нажмите на 📎, выберите фото ПТС или сделайте его, и отправьте его мне",
  addAutoVinNumberNote: "Введите VIN номер авто и отправьте его мне",
  addAutoDescriptionNote:
    "Введите VIN, номер кузова, год выпуска, объем и модель ДВС, тип КПП, тип привода, комплектацию и отправьте эту информацию мне",
  partsQualityNote:
    "Укажите ваши предпочтения по качеству требующихся запчасте:",
  originalPartsQuality: "Только оригинал",
  cheapPartsQuality: "Чем дешевле, тем лучше",
  goodPartsQuality: "Лучшее соотношение цены и качества",
  orderUrgencyNote: "Выберите срочность заказа:",
  lowUrgensyOrder: "Запчасти из наличия",
  highUrgencyOrder: "Готов подождать",
  fullOrderDataNote:
    "Ваша заявка запущена в работу. Я свяжусь с вами при получении новой информации",
};

exports.orderKeys = {
  newOrderBorderLine: "🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗",
  newOrderText: "Внимание, поступил новый заказ",
  userInfoText: function (name, userName, chatId) {
    return `Заказ сделал ${
      name.length > 0 ? name : "пользователь"
    }, его аккаунт в телеграме: @${userName}, id чата: ${chatId}`;
  },
  orderPhotoText: 'Заказчик добавил фото запчасти:',
  orderDescriptionText: function (description) {
    return `Заказчик добавил описание запчасти: ${description}`;
  },
  orderDeliveryText: function (type, address) {
    return `Выбран тип доставки: ${type}.${
      address.length > 0
        ? ` Доставку нужно осуществить по адресу: ${address}`
        : ""
    }`;
  },
  orderCarDocPhotoText: 'Фотография ПТС автомобиля:',
  orderCarVinNumberText: function (vin) {
    return `VIN номер автомобиля: ${vin}`;
  },
  orderCarParamsText: function (params) {
    return `Дополнительная информация о автомобиле: ${params}`;
  },
  orderPartsQualityText: function (quality) {
    return `Выбрано качество запчасти: ${quality}`;
  },
  orderUrgencyText: function (urgency) {
    return `Срочность заказа: ${urgency}`;
  },
};

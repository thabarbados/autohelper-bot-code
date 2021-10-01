const actionsNames = {
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

const orderKeys = {
  orderPhotoText: "Фото запчасти",
  orderCarDocPhotoText: "Фото ПТС автомобиля",
};

function getOrderText(state) {
  const {
    userName,
    userNickname,
    userChatId,
    orderTextDescription,
    deliveryType,
    deliveryAddress,
    autoVinNumber,
    autoParams,
    partsQuality,
    orderUrgency,
  } = state;

  return `🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗 🚗\n<strong>Внимание, поступил новый заказ.</strong>\n<strong>Заказ сделал</strong> ${
    userName.length > 0 ? userName : "пользователь"
  }${
    userNickname.length > 0 ? `, его аккаунт в телеграме: @${userNickname}.` : ""
  }\n<strong>ID чата</strong>: ${userChatId}.\n${
    orderTextDescription.length > 0
      ? `<strong>Заказчик добавил описание запчасти</strong>: ${orderTextDescription}.\n`
      : ""
  }${`<strong>Выбран тип доставки</strong>: ${deliveryType}. ${
    deliveryAddress.length > 0
      ? `Доставку нужно осуществить по адресу: ${deliveryAddress}`
      : ""
  }`}\n${
    autoVinNumber.length > 0
      ? `<strong>VIN номер автомобиля</strong>: ${autoVinNumber}.\n`
      : ""
  }${
    autoParams.length > 0
      ? `<strong>Дополнительная информация о автомобиле</strong>: ${autoParams}.\n`
      : ""
  }<strong>Выбрано качество запчасти</strong>: ${partsQuality}.\n<strong>Срочность заказа</strong>: ${orderUrgency}.`;
}

module.exports = { actionsNames, orderKeys, getOrderText };

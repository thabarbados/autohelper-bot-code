const DEFAULT_STATE = Object.freeze({
  isMultipleOrder: false,
  userName: "",
  userSurname: "",
  userNickname: "",
  userChatId: "",
  orderPhotoUrl: "",
  orderTextDescription: "",
  deliveryType: "",
  deliveryAddress: "",
  autoDocPhotoUrl: "",
  autoVinNumber: "",
  autoParams: "",
  partsQuality: "",
  orderUrgency: ""
});

let botState = {
  isMultipleOrder: false,
  userName: "",
  userSurname: "",
  userNickname: "",
  userChatId: "",
  orderPhotoUrl: "",
  orderTextDescription: "",
  deliveryType: "",
  deliveryAddress: "",
  autoDocPhotoUrl: "",
  autoVinNumber: "",
  autoParams: "",
  partsQuality: "",
  orderUrgency: "",
};

const resetStateToDefault = () => {
  botState = { ...DEFAULT_STATE };
};

module.exports = { botState, resetStateToDefault };

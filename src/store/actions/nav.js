import {
  OPEN_ADD_CHAT_POPUP,
  CLOSE_ADD_CHAT_POPUP,
} from "./actionTypes";

export const openAddChatPopup = () => {
  return {
    type: OPEN_ADD_CHAT_POPUP
  };
};

export const closeAddChatPopup = () => {
  return {
    type: CLOSE_ADD_CHAT_POPUP
  };
};

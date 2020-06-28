import { 
  ADD_NOTIFICATION,
  SET_NOTIFICATIONS,
  SET_UNVIEWS,
  SET_STATUS,
  GET_CHATS_SUCCESS
} from "../actions/actionTypes";

import { updateObject } from "../utility";

const initialState = {
  messages: [],
  chats: [],
  unview:null,
  hasMore:false,
  status: null
};

const addMessage = (state, action) => {
  return updateObject(state, {
    messages: [...state.messages, action.message]
  });
};

const setMessages = (state, action) => {
  return updateObject(state, {
    messages: action.messages,
    hasMore: action.hasMore 
  });
};

const setUnviews = (state, action) => {
  console.log("123456", action)
  return updateObject(state, {
    unview: action.unview,
  });
};

const setStatus = (state, action) => {
  return updateObject(state, {
    status: action.status
  });
}

const setChats = (state, action) => {
  return updateObject(state, {
    chats: action.chats
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return addMessage(state, action);
    case SET_NOTIFICATIONS:
      return setMessages(state, action);
    case SET_UNVIEWS:
      return setUnviews(state, action);
    case SET_STATUS:
      return setStatus(state, action);
    case GET_CHATS_SUCCESS:
      return setChats(state, action);
    default:
      return state;
  }
};

export default reducer;

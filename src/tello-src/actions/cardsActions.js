import { CONSTANTS } from ".";
import {v4 as uuid} from "uuid";
import axios from 'axios';
import { trelloCardCreateURL, trelloCardUpdateURL } from "../../constants";

export const addCard = (token, listID, text) => {
  return (dispatch) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      // Authorization: `Token ${token}`
    }
    axios.post(trelloCardCreateURL(listID), {text})
      .then(res => {
        if (res.status === 201) {
          const id = res.data
          dispatch({
            type: CONSTANTS.ADD_CARD,
            payload: { text, listID, id }
          });
        }
      })
      .catch(error => console.error(error))
  };
};

// const getCardListSuccess = (cards) => {
//   return {
//     type: CONSTANTS.FETCH_CARDS,
//     payload: { cards }
//   };
// };

// export const fetchCardList = ( username, token, listID ) => {
//   return dispatch => {
//     axios.defaults.headers = {
//       "Content-Type": "application/json",
//       Authorization: `Token ${token}`
//     }
//     axios.get(trelloCardListURL(username, listID))
//       .then(res => {
//         if (res.status === 200) {
//           const cards = res.data
//           dispatch (getCardListSuccess(cards))
//         }
//       })
//       .catch(error => console.error(error))
//       console.log('Error');
//   }
// }


export const editCard = (id, listID, newText, token) => {
  return (dispatch) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
    axios.put(trelloCardUpdateURL(listID), {newText, id})
      .then(res => {
        if (res.status === 200) {
          // const id = res.data
          console.log("CACAS 3X: ", id)
          dispatch({
            type: CONSTANTS.EDIT_CARD,
            payload: { id, listID, newText }
          });
        }
      })
      .catch(error => console.error(error))
  };
};

export const deleteCard = (id, listID, token) => {
  return (dispatch) => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    }
    axios.delete(trelloCardUpdateURL(listID), {data: {id: id}})
      .then(res => {
        if (res.status === 200) {
          // const id = res.data
          dispatch({
            type: CONSTANTS.DELETE_CARD,
            payload: { id, listID }
          });
        }
      })
      .catch(error => console.error(error))
  };
};

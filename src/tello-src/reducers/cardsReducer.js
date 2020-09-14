import { CONSTANTS } from "../actions";

const initialState = {
  "card-0": {
    text: "Last Episode",
    id: `card-0`,
    list: "list-0"
  }
};

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_CARD: {
      const { text, listID, id } = action.payload;

      const newCard = {
        text,
        id: `card-${id}`,
        list: listID
      };

      return { ...state, [`card-${id}`]: newCard };
    }

    //FETCHING CARDS FROM FETCHING LIST REQUEST
    case CONSTANTS.FETCH_LISTS: {
      const { lists } = action.payload;
      const lists_con = lists.map(el => {
        const cardList = el.cards.map(cardEl => {
          const text = cardEl.title
          const id = `card-${cardEl.id}`
          const cardComp = {
            text,
            id: id,
            list: `list-${el.id}`
          };
        return({ [id]: cardComp });
      })
      cardList.forEach((el) => {
        Object.assign(state, el)
        // console.log("DJADJA: ", Object.assign(state, el))
      });
    })
    // lists_con.forEach((el) => {
    //   Object.assign(state, el);
    // })
    console.log("DJADJA: ", state)
      return { ...state };
    }

    case CONSTANTS.EDIT_CARD: {
      const { id, newText } = action.payload;
      const card = state[id];
      card.text = newText;
      return { ...state, [`card-${id}`]: card };
    }

    case CONSTANTS.DELETE_CARD: {
      const { listID, id } = action.payload;
      const newState = state;
      delete newState[id];
      return newState;
    }
    default:
      return state;
  }
};

export default cardsReducer;

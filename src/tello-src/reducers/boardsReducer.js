import { CONSTANTS } from "../actions";

const initialState = {
  "board-0": {
    id: "board-0",
    lists: ["list-0"],
    title: "myboard"
  }
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {
      const { boardID, id } = action.payload;
      const board = state[boardID];
      const newListID = `list-${id}`;
      const newLists = [...board.lists, newListID];
      board.lists = newLists;
      return { ...state, [boardID]: board };
    }

    case CONSTANTS.DRAG_HAPPENED: {
      const { boardID } = action.payload;
      const board = state[boardID];
      const lists = board.lists;
      const {
        droppableIndexEnd,
        droppableIndexStart,

        type
      } = action.payload;

      // draggin lists around
      if (type === "list") {
        const pulledOutList = lists.splice(droppableIndexStart, 1);
        lists.splice(droppableIndexEnd, 0, ...pulledOutList);
        board.lists = lists;

        return { ...state, [boardID]: board };
      }
      return state;
    }
    case CONSTANTS.DELETE_LIST: {
      const { listID, boardID } = action.payload;
      const board = state[boardID];
      const lists = board.lists;
      const newLists = lists.filter(id => id !== listID);
      board.lists = newLists;
      console.log("MICAS => ", newLists, "board: ", board)
      return { ...state, [boardID]: board };
    }

    case CONSTANTS.ADD_BOARD: {
      const { title, id } = action.payload;
      const newID = `board-${id}`;
      const newBoard = {
        id: newID,
        title,
        lists: []
      };
      return { ...state, [newID]: newBoard };
    }

    case CONSTANTS.FETCH_BOARDS: {
      const { boards } = action.payload;
      const boardlist = boards.map(el => {
          const newID = `board-${el.id}`;
          const title = el.title
          const list = `list-${el.id}`;
          const newBoard = {
            id: newID,
            title:title,
            lists: el.lists.map((list_e, i) => {const list_item = `list-${list_e.id}`; return list_item })
          };
        return( { [newID]: newBoard } );
      })
      boardlist.forEach((el) => {
        Object.assign(state, el);
      })
      return ( { ...state })
    }

    case CONSTANTS.FETCH_LISTS: {
      console.log("ehreno QUE? ")
      const { lists, boardId } = action.payload;
      console.log("ehreno, ", lists)
      const title = lists[0]["board_title"]
        const theBoard = {
          id: boardId,
          title:title,
          lists: lists.map((list_e, i) => {const list_item = `list-${list_e.id}`; return list_item })
        };
      return( { ...state, [boardId]: theBoard } );
    }

    case CONSTANTS.FETCH_NO_LISTS: {
      const { lists, boardId } = action.payload;
      console.log("ehreno NO LISTS, ", lists)
      const title = lists[0]["board_title"]
        const theBoard = {
          id: boardId,
          title:title,
          lists: []
        };
      return( { ...state, [boardId]: theBoard } );
    }

    default:
      return state;
  }
};

export default boardsReducer;

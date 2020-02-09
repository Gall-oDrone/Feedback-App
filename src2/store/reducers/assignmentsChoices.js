import {
  GET_ASSIGNMENT_CHOICES_START,
  GET_ASSIGNMENTS_CHOICES_SUCCESS,
  GET_ASSIGNMENTS_CHOICES_FAIL
} from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  choices: [],
  currentChocies: {},
  error: null,
  loading: false
};

const getASNTChoiceStart = (state, action) => {
  console.log("1) Reducers getASNTChoiceStart")
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getASNTChoiceSuccess = (state, action) => {
  console.log("2) Reducers getASNTChoiceSuccess")
  console.log("3) Reducers getASNTChoiceSuccess state: " + JSON.stringify(state))
  return updateObject(state, {
    choices: action.choices,
    error: null,
    loading: false
  });
};

const getASNTChoiceFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state = initialState, action) => {
  console.log("4) Reducers action: " + JSON.stringify(action))
  console.log("5) Reducers action state: " + JSON.stringify(state))
  switch (action.type) {
    case GET_ASSIGNMENT_CHOICES_START:
        console.log("6) GET_ASSIGNMENT_CHOICES_START: ")
      return getASNTChoiceStart(state, action);
    case GET_ASSIGNMENTS_CHOICES_SUCCESS:
        console.log("7) GET_ASSIGNMENTS_CHOICES_SUCCESS: ")
      return getASNTChoiceSuccess(state, action);
    case GET_ASSIGNMENTS_CHOICES_FAIL:
      return getASNTChoiceFail(state, action);
    default:
      return state;
  }
};

export default reducer;


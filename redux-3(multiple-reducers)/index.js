import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { combineReducers } from "redux";

// constant for identification

const inc = "inc";
const dec = "dec";
const decby5 = "decby5";

// initial state for fixReducer
const fixInitialState = {
  value: 10,
};

// initial state for by5Reducer
const by5InitialState = {
  value: 10,
};

// fixReducer functioning :
const fixReducer = (state = fixInitialState, action) => {
  switch (action.type) {
    case inc:
      return { ...state, value: state.value + 1 };
    case dec:
      return { ...state, value: state.value - 1 };
    default:
      return state;
  }
};

// by5Reducer functioning :
const by5Reducer = (state = by5InitialState, action) => {
  switch (action.type) {

//🛑 when the increment function is run it will also run and update the value of the state by 4 because type is same 

    case inc:
      return { ...state, value: state.value + 4 };
    case decby5:
      return { ...state, value: state.value - 5 };
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  fixReducer,
  by5Reducer,
});
const store = createStore(rootReducer, applyMiddleware(logger.default));

function increment() {
  return {
    type: inc,
  };
}

function decrement() {
  return {
    type: dec,
  };
}

function decrementBy5() {
  return {
    type: decby5,
  };
}

store.dispatch(increment()); // will run for both the reducers....
store.dispatch(decrement());
store.dispatch(decrementBy5());

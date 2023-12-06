import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';


const elements = (state = [], action) => {
  switch (action.type) {
      case 'SET_ELEMENTS':
          return action.payload;
      default:
          return state;
  }
};    

// this is the saga that will watch for actions
function* rootSaga() {

}

const sagaMiddleware = createSagaMiddleware();

// This is creating the store
// the store is the big JavaScript Object that holds all of the information for our application
const store = createStore(
  // This function is our first reducer
  // reducer is a function that runs every time an action is dispatched
  combineReducers({
      elements,
  }),
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);


export default store;


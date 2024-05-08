import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {takeLatest, put} from 'redux-saga/effects'
import axios from 'axios';


const elements = (state = [], action) => {
  switch (action.type) {
      case 'SET_ELEMENTS':
          return action.payload;
      default:
          return state;
  }
};   

// the thing that does the work!
function* fetchElements () {

  // axios({
  //   method: 'GET',
  //   url: '/api/elements'
  // })
  //   .then((response) => {
  //     dispatch({
  //       type: 'SET_ELEMENTS',
  //       payload: response.data 
  //     });
  //   })
  //   .catch((error) => {
  //     console.log('error with element get request', error);
  //   });

  console.log('In fetchElements!')


  try {
    let response = yield axios({
      method: 'GET',
      url: '/api/elements'
    })
  
   //put in saga is the same as dispatch in react
       yield put({
          type: 'SET_ELEMENTS',
          payload: response.data 
        });
  } catch (error) {
      console.log('error with element get request', error);
  }


   
}


function* addElement (action) {

  try {
   yield axios({
      method: 'POST',
      url: '/api/elements',
      data: { 
        name: action.payload
      }
    })

    yield put({type: 'FETCH_ELEMENTS'});

  } catch (error) {
    console.log('error with element post request', error);

  }
}


// this is the saga that will watch for actions
function* rootSaga() {
  yield takeLatest('FETCH_ELEMENTS', fetchElements);
  yield takeLatest('ADD_ELEMENT', addElement)
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


import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, call } from 'redux-saga/effects';

import dataReducer from './reducers/data';
import authReducer from './reducers/auth';
import * as dataSaga from './sagas/data';
import authSaga from './sagas/auth';

import './index.css';
import App from './App';

const rootReducer = combineReducers({
  data: dataReducer,
  auth: authReducer,
});

function* rootSaga() {
  yield all([
    call(dataSaga.sagaRealTimeTask),
    call(dataSaga.sagaBatchDaylyTask),
    call(dataSaga.sagaBatchIntradayTask),
    ...authSaga,
  ]);
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();

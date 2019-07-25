import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

/*
*
*  Reducers
*
*/
import accountReducer from './account/AccountReducer';

const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
    accountState: accountReducer
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

export default store;
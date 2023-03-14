 import {applyMiddleware, compose } from "redux";
 import rootReducer from "./reducer";
 import { legacy_createStore as createStore } from 'redux';
 

 import thunkMiddleware from "redux-thunk";

 const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 const store = createStore(
   rootReducer,
   composeEnhancer(applyMiddleware(thunkMiddleware))
 );

 export default store;

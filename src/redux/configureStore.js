import { combineReducers, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";
import Board from "redux/modules/Board";
import Sidebar from "redux/modules/sidebar";
import ProfileImg from "redux/modules/profileimg";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  board: Board,
  sidebar: Sidebar,
  profileimg: ProfileImg,
  router: connectRouter(history),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk.withExtraArgument({ history: history }), logger],
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

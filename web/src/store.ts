import { Store, createStore, applyMiddleware } from "redux";
import { timeManagerApp } from "./reducers";
import { State } from "./state";
import thunk from "redux-thunk";
//import createLogger from "redux-logger";

let _store: Store<State>;
//const _loggerMiddleware = createLogger();

export function getStore() {
    return _store ? _store : (_store = createStore(timeManagerApp, applyMiddleware(thunk)));
}
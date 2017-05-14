import { Store, createStore, applyMiddleware } from "redux";
import { rootReducer } from "./reducers/rootReducer";
import { State } from "./state";
import thunk from "redux-thunk";

let _store: Store<State>;

export function getStore() {
    return _store ? _store : (_store = createStore(rootReducer, applyMiddleware(thunk)));
}
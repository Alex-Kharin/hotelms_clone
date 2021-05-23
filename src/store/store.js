import {combineReducers, createStore} from "redux";
import {tableReducer} from "./tableReducer";

let reducers = combineReducers({
    table: tableReducer,
})

export let store = createStore(reducers)

window.store = store;
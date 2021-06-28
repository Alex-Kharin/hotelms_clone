import {combineReducers, createStore} from "redux";
import {tableReducer} from "./tableReducer";
import {tableHotelRoomsReducer} from './tableHotelRoomsReducer'

let reducers = combineReducers({
    table: tableReducer,
    tableApartments: tableHotelRoomsReducer
})

export let store = createStore(reducers)

window.store = store;
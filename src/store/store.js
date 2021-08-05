import {combineReducers, createStore} from 'redux'
import {tableReducer} from './tableReducer'
import {tableApartmentsReducer} from './tableApartmentsReducer'

let reducers = combineReducers({
    table: tableReducer,
    tableApartments: tableApartmentsReducer
})

export let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

window.store = store;
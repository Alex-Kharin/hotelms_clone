import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {tableReducer} from './tableReducer'
import {tableApartmentsReducer} from './tableApartmentsReducer'
import ReduxThunk from 'redux-thunk'

let reducers = combineReducers({
    table: tableReducer,
    tableApartments: tableApartmentsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export let store = createStore(reducers,  composeEnhancers(applyMiddleware(ReduxThunk)))

window.store = store;
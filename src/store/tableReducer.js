import {addDays, set, subDays} from 'date-fns'
import {time} from '../settings/settings'

const SHIFT_LEFT = 'SHIFT_LEFT'
const SHIFT_RIGHT = 'SHIFT_RIGHT'
const SHIFT_NOW = 'SHIFT_NOW'
const SHIFT_FROM = 'SHIFT_FROM'
const DAYS_IN_TABLE = 'DAYS_IN_TABLE'

const from = set(new Date(),time)
const to = addDays(from, 29)

const initialState ={
    daysInTable: 29,
    interval: {start: from, end: to}
}

function tableReducer(state=initialState, action){
    switch (action.type) {
        case SHIFT_LEFT: {
            const start = addDays(state.interval.start, 1)
            const end = addDays(state.interval.end, 1)
            return {
                ...state,
                interval: {start, end},
            }
        }
        case SHIFT_RIGHT: {
            const start = subDays(state.interval.start, 1)
            const end = subDays(state.interval.end, 1)
            return {
                ...state,
                interval: {start, end},
            }
        }
        case SHIFT_NOW: {
            const end = addDays(from, state.daysInTable)
            return {
                ...state,
                interval: {start: from, end}
            }
        }
        case SHIFT_FROM: {
            const start = action.from
            const end = addDays(start, state.daysInTable)
            return {
                ...state,
                interval: {start, end}
            }
        }
        case DAYS_IN_TABLE: {
            const end = addDays(state.interval.start, action.days)
            return {
                ...state,
                daysInTable: action.days,
                interval: {...state.interval, end}
            }
        }
    
        default: return state
    }
}

const shiftDateIntervalLeft = () => ({type: SHIFT_LEFT})
const shiftDateIntervalRight = () => ({type: SHIFT_RIGHT})
const shiftDateIntervalFrom = (FromDay) => ({type: SHIFT_FROM, from: FromDay})
const shiftDateIntervalNow = () => ({type: SHIFT_NOW})
const changeDaysInTable = (days) => ({type: DAYS_IN_TABLE, days})

export {tableReducer, shiftDateIntervalLeft, shiftDateIntervalRight, shiftDateIntervalFrom, shiftDateIntervalNow, changeDaysInTable}





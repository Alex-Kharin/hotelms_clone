import {addDays, eachDayOfInterval} from 'date-fns'

const SHIFT_LEFT = 'SHIFT_LEFT'
const SHIFT_RIGHT = 'SHIFT_RIGHT'
const SHIFT_NOW = 'SHIFT_NOW'
const SHIFT_FROM = 'SHIFT_FROM'
// const DISPLAY_FROM = 'DISPLAY_FROM'

let from = new Date()
let to = addDays(from, 29)
let days = eachDayOfInterval({start: from, end: to})

let initialState ={
    daysInTable: 29,
    from,
    days,
}

function tableReducer(state=initialState, action){
    switch (action.type) {
        case SHIFT_LEFT: {
            return {
                ...state,
                from: action.firstDay,
                days: [action.firstDay,...state.days.slice(0, -1)]
            }
        }
        case SHIFT_RIGHT: {
            return {
                ...state,
                from: addDays(state.from, 1),
                days: [...state.days.slice(1), action.lastDay],
            }
        }
        case SHIFT_NOW: {
            return {
                ...state,
                from: new Date(),
                days: [...initialState.days],
            }
        }
        case SHIFT_FROM: {
            return {
                ...state,
                from: action.from,
                days: eachDayOfInterval({start: action.from, end: addDays(action.from, state.daysInTable)}),
            }
        }
    
        default: return state
    }
}

const shiftDateIntervalLeft = (firstDay) => ({type: SHIFT_LEFT, firstDay: firstDay})
const shiftDateIntervalRight = (lastDay) => ({type: SHIFT_RIGHT, lastDay: lastDay})
const shiftDateIntervalFrom = (FromDay) => ({type: SHIFT_FROM, from: FromDay})
// const DateIntervalDisplayFrom = () => ({type: DISPLAY_FROM})
const shiftDateIntervalNow = () => ({type: SHIFT_NOW})

export {tableReducer, shiftDateIntervalLeft, shiftDateIntervalRight, shiftDateIntervalFrom, shiftDateIntervalNow}





import {addDays, eachDayOfInterval} from 'date-fns'

const SHIFT_LEFT = 'SHIFT_LEFT'
const SHIFT_RIGHT = 'SHIFT_RIGHT'
const SHIFT_NOW = 'SHIFT_NOW'

let from = new Date()
let to = addDays(from, 29)
let days = eachDayOfInterval({start: from, end: to})

let initialState ={
    daysInTable: 29,
    days,
}

function tableReducer(state=initialState, action){
    switch (action.type) {
        case SHIFT_LEFT: {
            return {
                ...state,
                days: [action.firstDay,...state.days.slice(0, -1)],
            }
        }
        case SHIFT_RIGHT: {
            return {
                ...state,
                days: [...state.days.slice(1), action.lastDay],
            }
        }
        case SHIFT_NOW: {
            return {
                ...state,
                days: [...initialState.days],
            }
        }
    
        default: return state
    }
}

const shiftDateIntervalLeft = (firstDay) => ({type: SHIFT_LEFT, firstDay: firstDay})
const shiftDateIntervalRight = (lastDay) => ({type: SHIFT_RIGHT, lastDay: lastDay})
const shiftDateIntervalNow = () => ({type: SHIFT_NOW})

export {tableReducer, shiftDateIntervalLeft, shiftDateIntervalRight, shiftDateIntervalNow}





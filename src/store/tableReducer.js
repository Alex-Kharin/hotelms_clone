import {addDays, eachDayOfInterval} from "date-fns";

const SOME_STUFF = 'SOME_STUFF'

let from = new Date()
let to = addDays(from, 29)
let days = eachDayOfInterval({start: from, end: to})

let initialState ={
    daysInTable: 29,
    days,
}

export function tableReducer(state=initialState, action){
    switch (action.type) {
        case SOME_STUFF: {
            return {
            
            }
        }
    
        default: return state
    }
}




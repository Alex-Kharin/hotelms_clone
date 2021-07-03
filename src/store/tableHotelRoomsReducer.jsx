import {convertObjectWithArraysToObjectWithObjects} from '../commonUtils/commonUtils'


const IS_SELECT = 'IS_SELECT'
const SELECTED_DAY = 'SELECTED_DAY'
const CLEAR_SELECTED_DAYS = 'CLEAR_SELECTED_DAYS'


const initialState ={
    apartments: {
        standard: [
            {
                id: 1,
                apartmentsNumber: 100,
                numberOfPersons: 2,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            },
            {
                id: 2,
                apartmentsNumber: 122,
                numberOfPersons: 2,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            },
            {
                id: 3,
                apartmentsNumber: 145,
                numberOfPersons: 2,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            },
            {
                id: 4,
                apartmentsNumber: 201,
                numberOfPersons: 3,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            },
            {
                id: 5,
                apartmentsNumber: 210,
                numberOfPersons: 3,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            }
        ],
        comfortable: [
            {
                id: 6,
                apartmentsNumber: 300,
                numberOfPersons: 2,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            },
            {
                id: 7,
                apartmentsNumber: 322,
                numberOfPersons: 2,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            },
            {
                id: 8,
                apartmentsNumber: 345,
                numberOfPersons: 2,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            },
            {
                id: 9,
                apartmentsNumber: 401,
                numberOfPersons: 3,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            },
            {
                id: 10,
                apartmentsNumber: 410,
                numberOfPersons: 3,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            }
        ],
        lux: [
            {
                id: 11,
                apartmentsNumber: 500,
                numberOfPersons: 5,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            },
            {
                id: 12,
                apartmentsNumber: 601,
                numberOfPersons: 5,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            },
            {
                id: 13,
                apartmentsNumber: 610,
                numberOfPersons: 5,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            }
        ],
    },
    isSelect: false,
    selectedDay: [],
    cellWidth: null,
    cellHeight: null,
}

initialState.apartments = convertObjectWithArraysToObjectWithObjects('id', initialState.apartments)

function tableHotelRoomsReducer(state=initialState, action){
    switch (action.type) {
        case IS_SELECT: {
            return {
                ...state,
                isSelect: action.isSelect
            }
        }
        case SELECTED_DAY: {
            return {
                ...state,
                selectedDay: [...state.selectedDay, action.selectedDay]
            }
        }
        case CLEAR_SELECTED_DAYS: {
            return {
                ...state,
                selectedDay: [],
            }
        }

        default: return state
    }
}

const isSelectCells = (isSelect) => ({type: IS_SELECT, isSelect})
const selectedDayAC = (selectedDay) => ({type: SELECTED_DAY, selectedDay})
const clearSelectedDays = () => ({type: CLEAR_SELECTED_DAYS})

export {tableHotelRoomsReducer, isSelectCells, selectedDayAC, clearSelectedDays, }





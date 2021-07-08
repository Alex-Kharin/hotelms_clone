import {convertObjectWithArraysToObjectWithObjects} from '../commonUtils/commonUtils'
import {addDays, isBefore, subDays} from 'date-fns'


const IS_SELECT = 'IS_SELECT'
const START_SELECTION_INTERVAL = 'START_SELECTION_INTERVAL'
const END_SELECTION_INTERVAL = 'END_SELECTION_INTERVAL'
const CLEAR_SELECTED_DAYS = 'CLEAR_SELECTED_DAYS'
const APARTMENT_ID = 'APARTMENT_ID'
const CELL_DIMENSIONS = 'CELL_DIMENSIONS'
const RENT_INTERVAL = 'RENT_INTERVAL'
const LEFT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL = 'LEFT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL'
const LEFT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL = 'LEFT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL'
const RIGHT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL = 'RIGHT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL'
const RIGHT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL = 'RIGHT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL'

const initialState = {
    apartments: {
        standard: [
            {
                id: 1,
                apartmentsNumber: 100,
                numberOfPersons: 2,
                rentInterval: {},
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            },
            // {
            //     id: 2,
            //     apartmentsNumber: 122,
            //     numberOfPersons: 2,
            //     rentInterval: {},
            //     chekInTime: null,
            //     chekOutTime: null,
            //     isFree: true,
            // },
            // {
            //     id: 3,
            //     apartmentsNumber: 145,
            //     numberOfPersons: 2,
            //     rentInterval: {},
            //     chekInTime: null,
            //     chekOutTime: null,
            //     isFree: true,
            // },
            // {
            //     id: 4,
            //     apartmentsNumber: 201,
            //     numberOfPersons: 3,
            //     rentInterval: {},
            //     chekInTime: null,
            //     chekOutTime: null,
            //     isFree: true,
            // },
            // {
            //     id: 5,
            //     apartmentsNumber: 210,
            //     numberOfPersons: 3,
            //     rentInterval: {},
            //     chekInTime: null,
            //     chekOutTime: null,
            //     isFree: true,
            // }
        ],
        // comfortable: [
        //     {
        //         id: 6,
        //         apartmentsNumber: 300,
        //         numberOfPersons: 2,
        //         rentInterval: {},
        //         chekInTime: null,
        //         chekOutTime: null,
        //         isFree: true,
        //     },
        //     {
        //         id: 7,
        //         apartmentsNumber: 322,
        //         numberOfPersons: 2,
        //         rentInterval: {},
        //         chekInTime: null,
        //         chekOutTime: null,
        //         isFree: true,
        //     },
        //     {
        //         id: 8,
        //         apartmentsNumber: 345,
        //         numberOfPersons: 2,
        //         rentInterval: {},
        //         chekInTime: null,
        //         chekOutTime: null,
        //         isFree: true,
        //     },
        //     {
        //         id: 9,
        //         apartmentsNumber: 401,
        //         numberOfPersons: 3,
        //         rentInterval: {},
        //         chekInTime: null,
        //         chekOutTime: null,
        //         isFree: true,
        //     },
        //     {
        //         id: 10,
        //         apartmentsNumber: 410,
        //         numberOfPersons: 3,
        //         rentInterval: {},
        //         chekInTime: null,
        //         chekOutTime: null,
        //         isFree: true,
        //     }
        // ],
        // lux: [
        //     {
        //         id: 11,
        //         apartmentsNumber: 500,
        //         numberOfPersons: 5,
        //         rentInterval: {},
        //         chekInTime: null,
        //         chekOutTime: null,
        //         isFree: true,
        //     },
        //     {
        //         id: 12,
        //         apartmentsNumber: 601,
        //         numberOfPersons: 5,
        //         rentInterval: {},
        //         chekInTime: null,
        //         chekOutTime: null,
        //         isFree: true,
        //     },
        //     {
        //         id: 13,
        //         apartmentsNumber: 610,
        //         numberOfPersons: 5,
        //         rentInterval: {},
        //         chekInTime: null,
        //         chekOutTime: null,
        //         isFree: true,
        //     }
        // ],
    },
    isSelect: false,
    selectInterval: {start: null, end: null},
    apartmentId: null,
    cellDimensions: {},
    viewRentIntervals: {}
}

initialState.apartments = convertObjectWithArraysToObjectWithObjects('id', initialState.apartments)

function tableHotelRoomsReducer(state = initialState, action) {
    switch (action.type) {
        case IS_SELECT: {
            return {
                ...state,
                isSelect: action.isSelect
            }
        }
        case START_SELECTION_INTERVAL: {
            return {
                ...state,
                selectInterval: {start: action.startSelection, end: action.startSelection}
            }
        }
        case END_SELECTION_INTERVAL: {
            return {
                ...state,
                selectInterval: {...state.selectInterval, end: action.endSelection}
            }
        }
        case APARTMENT_ID: {
            return {
                ...state,
                apartmentId: action.apartmentId,
            }
        }
        case CLEAR_SELECTED_DAYS: {
            return {
                ...state,
                selectInterval: {},
            }
        }
        case CELL_DIMENSIONS: {
            return {
                ...state,
                cellDimensions: action.cellDimensions,
            }
        }
        case RENT_INTERVAL: {
            // state.apartments[action.apartmentsType][action.apartmentId].rentInterval = action.rentInterval // this is what the code below does
            return {
                ...state,
                apartments: {
                    ...state.apartments, [action.apartmentsType]: {
                        ...state.apartments[action.apartmentsType],
                        [action.apartmentId]: {
                            ...state.apartments[action.apartmentsType][action.apartmentId],
                            rentInterval: action.rentInterval
                        }
                    }
                },
                viewRentIntervals: {[action.apartmentId]: action.rentInterval}
            }
        }
        case LEFT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL: {
            let start = state.viewRentIntervals[action.apartmentId].start
            let end = state.viewRentIntervals[action.apartmentId].end
            if (isBefore(start, end)) {
                start = addDays(start, 1)
                return {
                    ...state,
                    viewRentIntervals: {...state.viewRentIntervals, [action.apartmentId]: {start, end}},
                }
            } else return state
        }
        case LEFT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL: {
            let start = state.viewRentIntervals[action.apartmentId].start
            let end = state.viewRentIntervals[action.apartmentId].end
            start = subDays(start, 1)
            return {
                ...state,
                viewRentIntervals: {...state.viewRentIntervals, [action.apartmentId]: {start, end}},
            }
        }
        case RIGHT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL: {
            let start = state.viewRentIntervals[action.apartmentId].start
            let end = state.viewRentIntervals[action.apartmentId].end
                end = subDays(end, 1)
                return {
                    ...state,
                    viewRentIntervals: {...state.viewRentIntervals, [action.apartmentId]: {start, end}},
                }
        }
        case RIGHT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL: {
            let start = state.viewRentIntervals[action.apartmentId].start
            let end = state.viewRentIntervals[action.apartmentId].end
            end = addDays(end, 1)
            return {
                ...state,
                viewRentIntervals: {...state.viewRentIntervals, [action.apartmentId]: {start, end}},
            }
        }

        default:
            return state
    }
}

const setSelecting = (isSelect) => ({type: IS_SELECT, isSelect})
const setStartSelection = (startSelection) => ({type: START_SELECTION_INTERVAL, startSelection})
const setEndSelection = (endSelection) => ({type: END_SELECTION_INTERVAL, endSelection})
const setApartmentId = (apartmentId) => ({type: APARTMENT_ID, apartmentId})
const clearSelectedDays = () => ({type: CLEAR_SELECTED_DAYS})
const setCellDimensions = (cellDimensions) => ({type: CELL_DIMENSIONS, cellDimensions})
const leftSideShiftLeftViewRentInterval = (apartmentId) => ({type: LEFT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL, apartmentId})
const leftSideShiftRightViewRentInterval = (apartmentId) => ({type: LEFT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL, apartmentId})
const rightSideShiftLeftViewRentInterval = (apartmentId) => ({type: RIGHT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL, apartmentId})
const rightSideShiftRightViewRentInterval = (apartmentId) => ({type: RIGHT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL, apartmentId})
const setRentInterval = (apartmentsType, apartmentId, rentInterval) => ({
    type: RENT_INTERVAL,
    apartmentsType,
    apartmentId,
    rentInterval
})


export {
    tableHotelRoomsReducer,
    setSelecting,
    setStartSelection,
    setEndSelection,
    setApartmentId,
    clearSelectedDays,
    setCellDimensions,
    setRentInterval,
    leftSideShiftLeftViewRentInterval,
    leftSideShiftRightViewRentInterval,
    rightSideShiftLeftViewRentInterval,
    rightSideShiftRightViewRentInterval,

}





import {convertObjectWithArraysToObjectWithObjects} from '../commonUtils/commonUtils'
import {addDays, areIntervalsOverlapping, subDays} from 'date-fns'
import {shifterViewedRentIntervals} from '../components/Table/utils/utils'
import {borderWidth, gridAutoRowsHeight, gridColumnsWidth, tariffs} from '../settings/settings'


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
const RENT_INFO = 'RENT_INFO'

const initialState = {
    apartments: {
        standard: [
            {
                id: 1,
                apartmentsNumber: 100,
                numberOfPersons: 2,
                rentInfo: [
                    {
                        id: 1,
                        rentInterval:{
                            start: new Date(2021,7,1,12,0,0,0),
                            end: new Date(2021,7,10,12,0,0,0)
                        },
                        personInfo:{firstName: 'Иван', lastName: 'Грозный', email: 'grozni@pizdec.doc', phone: '111-222-333-4'},
                        additionalPersons: 1,
                        persons: 2,
                        tariff: 'lux',
                        percentageDiscount: 0,
                        moneyDiscount: 500,
                        // price: 11100,
                    },

                ],
            },
            {
                id: 2,
                apartmentsNumber: 122,
                numberOfPersons: 2,
                rentInfo: [],
            },
            {
                id: 3,
                apartmentsNumber: 145,
                numberOfPersons: 2,
                rentInfo: [],
            },
            {
                id: 4,
                apartmentsNumber: 201,
                numberOfPersons: 3,
                rentInfo: [],
            },
            {
                id: 5,
                apartmentsNumber: 210,
                numberOfPersons: 3,
                rentInfo: [],
            }
        ],
        comfortable: [
            {
                id: 6,
                apartmentsNumber: 300,
                numberOfPersons: 2,
                rentInfo: [],
            },
            {
                id: 7,
                apartmentsNumber: 322,
                numberOfPersons: 2,
                rentInfo: [],
            },
            {
                id: 8,
                apartmentsNumber: 345,
                numberOfPersons: 2,
                rentInfo: [],
            },
            {
                id: 9,
                apartmentsNumber: 401,
                numberOfPersons: 3,
                rentInfo: [],
            },
            {
                id: 10,
                apartmentsNumber: 410,
                numberOfPersons: 3,
                rentInfo: [],
            }
        ],
        lux: [
            {
                id: 11,
                apartmentsNumber: 500,
                numberOfPersons: 5,
                rentInfo: [],
            },
            {
                id: 12,
                apartmentsNumber: 601,
                numberOfPersons: 5,
                rentInfo: [],
            },
            {
                id: 13,
                apartmentsNumber: 610,
                numberOfPersons: 5,
                rentInfo: [],
            }
        ],
    },
    tariffs,
    isSelect: false,
    selectInterval: {start: null, end: null},
    apartmentId: null,
    cellDimensions:{
        width: gridColumnsWidth - 2 * borderWidth,
        height: gridAutoRowsHeight - 2 * borderWidth
    },
    viewRentIntervals: {1:[{
            start: new Date(2021,7,1,12,0,0,0),
            end: new Date(2021,7,10,12,0,0,0)
        }]}
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
            const rentInfo = state.apartments[action.apartmentsType][state.apartmentId].rentInfo
            if (rentInfo.some(item => areIntervalsOverlapping(item.rentInterval, action.rentInterval))) return state

            // state.apartments[action.apartmentsType][state.apartmentId].rentInterval.push(action.rentInterval) // this is what the code below does
            return {
                ...state,
                apartments: {
                    ...state.apartments, [action.apartmentsType]: {
                        ...state.apartments[action.apartmentsType],
                        [state.apartmentId]: {
                            ...state.apartments[action.apartmentsType][state.apartmentId],
                            // rentInterval: [...state.apartments[action.apartmentsType][state.apartmentId].rentInterval, action.rentInterval]
                            rentInfo: [...state.apartments[action.apartmentsType][state.apartmentId].rentInfo, {rentInterval: action.rentInterval}]
                        }
                    }
                },
                viewRentIntervals: {
                    ...state.viewRentIntervals,
                    [state.apartmentId]: [...state.viewRentIntervals[state.apartmentId] || [], action.rentInterval]
                }
            }
        }
        case LEFT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL: {
            return shifterViewedRentIntervals(state, action, 'start', addDays)
        }
        case LEFT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL: {
            return shifterViewedRentIntervals(state, action, 'start', subDays)
        }
        case RIGHT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL: {
            return shifterViewedRentIntervals(state, action, 'end', subDays)
        }
        case RIGHT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL: {
            return shifterViewedRentIntervals(state, action, 'end', addDays)
        }
        case RENT_INFO: {
            state = {...state }
            state.apartments = {...state.apartments}
            state.apartments[action.apartmentsType] = {...state.apartments[action.apartmentsType]}
            state.apartments[action.apartmentsType][action.apartmentId]={...state.apartments[action.apartmentsType][action.apartmentId]}
            state.apartments[action.apartmentsType][action.apartmentId].rentInfo = [...state.apartments[action.apartmentsType][action.apartmentId].rentInfo]
            state.apartments[action.apartmentsType][action.apartmentId].rentInfo[action.index] = action.rentInfo
            return state
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
const leftSideShiftLeftViewRentInterval = (apartmentId, index) => ({
    type: LEFT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL,
    apartmentId, index
})
const leftSideShiftRightViewRentInterval = (apartmentId, index) => ({
    type: LEFT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL,
    apartmentId, index
})
const rightSideShiftLeftViewRentInterval = (apartmentId, index) => ({
    type: RIGHT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL,
    apartmentId, index
})
const rightSideShiftRightViewRentInterval = (apartmentId, index) => ({
    type: RIGHT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL,
    apartmentId, index
})
const setRentInterval = (apartmentsType, rentInterval) => ({
    type: RENT_INTERVAL,
    apartmentsType,
    rentInterval
})
const setRentInfo = (apartmentsType, index, apartmentId, rentInfo) => ({
    type: RENT_INFO,
    apartmentsType,
    index,
    apartmentId,
    rentInfo
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
    setRentInfo,

}





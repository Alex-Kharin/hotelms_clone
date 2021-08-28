import {addDays, areIntervalsOverlapping, subDays} from 'date-fns'
import {
    adjustsInterval,
    collectObjects,
    createApartments,
    CreateViewRentIntervals,
    shifterViewedRentIntervals
} from '../components/Table/utils/utils'
import {borderWidth, gridAutoRowsHeight, gridColumnsWidth, tariffs} from '../settings/settings'
import {apartmentsApi} from '../api/api'


const APARTMENTS = 'APARTMENTS'
const VIEW_RENT_INTERVALS = 'VIEW_RENT_INTERVALS'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const IS_SELECT = 'IS_SELECT'
const START_SELECTION_INTERVAL = 'START_SELECTION_INTERVAL'
const END_SELECTION_INTERVAL = 'END_SELECTION_INTERVAL'
const CLEAR_SELECTED_DAYS = 'CLEAR_SELECTED_DAYS'
const APARTMENT_ID = 'APARTMENT_ID'
const RENT_INTERVAL = 'RENT_INTERVAL'
const LEFT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL = 'LEFT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL'
const LEFT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL = 'LEFT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL'
const RIGHT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL = 'RIGHT_SIDE_SHIFT_LEFT_VIEW_RENT_INTERVAL'
const RIGHT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL = 'RIGHT_SIDE_SHIFT_RIGHT_VIEW_RENT_INTERVAL'
const RENT_INFO = 'RENT_INFO'
const OPEN_MODAL = 'OPEN_MODAL'
const CANCEL_RENT = 'CANCEL_RENT'


const initialState = {
    apartments: {},
    tariffs,
    isFetching: true,
    isSelect: false,
    isOpenModal: false,
    selectInterval: {start: null, end: null},
    apartmentId: null,
    cellDimensions:{
        width: gridColumnsWidth - 2 * borderWidth,
        height: gridAutoRowsHeight - 2 * borderWidth
    },
    viewRentIntervals: {},
}


function tableApartmentsReducer(state = initialState, action) {
    switch (action.type) {
        case APARTMENTS: {
            return {
                ...state,
                apartments: action.apartments
            }
        }
        case VIEW_RENT_INTERVALS: {
            return {
                ...state,
                viewRentIntervals: action.viewRentIntervals
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
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
        case RENT_INTERVAL: {
            const rentInfo = state.apartments[action.apartmentsType][state.apartmentId].rentInfo
            if (rentInfo.some(item => areIntervalsOverlapping(item.rentInterval, action.rentInterval))) return state

            return {
                ...state,
                apartments: {
                    ...state.apartments, [action.apartmentsType]: {
                        ...state.apartments[action.apartmentsType],
                        [state.apartmentId]: {
                            ...state.apartments[action.apartmentsType][state.apartmentId],
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
        case OPEN_MODAL: {
            return {
                ...state,
                isOpenModal: action.isOpenModal
            }
        }
        case CANCEL_RENT: {
            state = {...state }
            state.apartments = {...state.apartments}
            state.apartments[action.apartmentsType] = {...state.apartments[action.apartmentsType]}
            state.apartments[action.apartmentsType][action.apartmentId]={...state.apartments[action.apartmentsType][action.apartmentId]}
            state.apartments[action.apartmentsType][action.apartmentId].rentInfo=
                state.apartments[action.apartmentsType][action.apartmentId].rentInfo.filter((_, index) => index !== action.index)

            state.viewRentIntervals = {...state.viewRentIntervals}
            state.viewRentIntervals[action.apartmentId] = state.viewRentIntervals[action.apartmentId].filter((_, index)=> index !== action.index)
            return state
        }
        default:
            return state
    }
}

const setApartments = (apartments) => ({type: APARTMENTS, apartments})
const setViewRentIntervals = (viewRentIntervals) => ({type: VIEW_RENT_INTERVALS, viewRentIntervals})
const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})
const setSelecting = (isSelect) => ({type: IS_SELECT, isSelect})
const setIsOpenModal = (isOpenModal) => ({type: OPEN_MODAL, isOpenModal})
const setStartSelection = (startSelection) => ({type: START_SELECTION_INTERVAL, startSelection})
const setEndSelection = (endSelection) => ({type: END_SELECTION_INTERVAL, endSelection})
const setApartmentId = (apartmentId) => ({type: APARTMENT_ID, apartmentId})
const clearSelectedDays = () => ({type: CLEAR_SELECTED_DAYS})
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
const cancelRent = (apartmentsType, index, apartmentId) => ({
    type: CANCEL_RENT,
    apartmentsType,
    index,
    apartmentId
})

function requestApartments() {
    return async (dispatch, getState) => {
        dispatch(toggleIsFetching(true))

        const apartmentsArray = await apartmentsApi.getApartments()
        const rentInfos = await apartmentsApi.getRentInfo()

        rentInfos.forEach(rentInfo => {
            rentInfo.rentInterval.start = new Date(rentInfo.rentInterval.start)
            rentInfo.rentInterval.end = new Date(rentInfo.rentInterval.end)
            rentInfo.rentInterval = adjustsInterval(rentInfo.rentInterval)
        })

        const collection = collectObjects(apartmentsArray, rentInfos)
        const apartments = createApartments(collection)
        const viewRentIntervals = CreateViewRentIntervals(rentInfos, getState().table.interval)

        dispatch(setApartments(apartments))
        dispatch(setViewRentIntervals(viewRentIntervals))
        dispatch(toggleIsFetching(false))
    }

}

function createUpdateRentInfo(operation, apartmentsType, index, apartmentId, newRentInfo) {
    return async function(dispatch) {
        try {
            const response = operation === 'create'
                ? await apartmentsApi.createRentInfo(newRentInfo)
                : operation === 'update'
                    ? await apartmentsApi.updateRentInfo(newRentInfo)
                    : null
            if (response.statusText === 'OK' || 'Created') {
                dispatch(setRentInfo(apartmentsType, index, apartmentId, response.data))
            }
        } catch (error){
            console.error(error)
        }
    }
}

function deleteRentInfo(apartmentsType, index, apartmentId, rentInfoId) {
    return async function(dispatch) {
        try {
            const response = await apartmentsApi.deleteRentInfo(rentInfoId)
            if (response.statusText === 'OK') {
                dispatch(cancelRent(apartmentsType, index, apartmentId))
            }
        } catch (error) {
            console.error(error)
        }
    }
}


export {
    tableApartmentsReducer,
    setSelecting,
    setStartSelection,
    setEndSelection,
    setApartmentId,
    clearSelectedDays,
    setRentInterval,
    leftSideShiftLeftViewRentInterval,
    leftSideShiftRightViewRentInterval,
    rightSideShiftLeftViewRentInterval,
    rightSideShiftRightViewRentInterval,
    setIsOpenModal,
    requestApartments,
    createUpdateRentInfo,
    deleteRentInfo,

}





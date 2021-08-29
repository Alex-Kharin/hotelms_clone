import {createSelector} from 'reselect'
import {areIntervalsOverlapping, eachDayOfInterval, isSameDay, set} from 'date-fns'
import {time} from '../settings/settings'

export const getApartments = (state) => state.tableApartments.apartments
export const getViewRentIntervals = (state) => state.tableApartments.viewRentIntervals
export const getCellDimensions = (state) => state.tableApartments.cellDimensions
export const getTariffs = (state) => state.tableApartments.tariffs
export const getIsOpenModal = (state) => state.tableApartments.isOpenModal
export const getIsFetching = (state) => state.tableApartments.isFetching
export const getIsUpdating = (state) => state.tableApartments.isUpdating
export const getDays = (state) => eachDayOfInterval(state.table.interval).map(day=>set(day, time))

export const getFreeApartments = createSelector(
    getApartments,
    getDays,
    (apartments, days) => {

        return Object.keys(apartments).reduce((acc, apartmentType) => {

            for (let i = 0; i < days.length; i++) {
                let freeApartments = Object.keys(apartments[apartmentType]).length
                let day = days[i]
                Object.values(apartments[apartmentType]).forEach(apartment => {
                    if (apartment.rentInfo.some(item => areIntervalsOverlapping({
                                start: day,
                                end: day
                            }, item.rentInterval, {inclusive: false}) ||
                            (isSameDay(day, item.rentInterval.end) && apartment.rentInfo.some(element => isSameDay(day, element.rentInterval.start)))
                    )) {
                        freeApartments--
                    }

                })
                acc[apartmentType] = [...acc[apartmentType] || [], {freeApartments, day}]
            }

            return acc
        }, {})

    }
)
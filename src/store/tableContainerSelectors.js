import {createSelector} from 'reselect'
import {adjustsInterval} from '../components/Table/utils/utils'


export const getInterval = (state) => state.table.interval
export const getDaysInTable = (state) => state.table.daysInTable
export const getIsSelect = (state) => state.tableApartments.isSelect
export const getApartmentId = (state) => state.tableApartments.apartmentId
export const getSelectIntervalSelector = (state) => state.tableApartments.selectInterval

export const getSelectInterval = createSelector(
    getSelectIntervalSelector,
    selectInterval => adjustsInterval(selectInterval)
)

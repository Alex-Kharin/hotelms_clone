import {connect} from "react-redux";
import {Table} from "./Table";
import {
    shiftDateIntervalFrom,
    shiftDateIntervalLeft,
    shiftDateIntervalNow,
    shiftDateIntervalRight,
} from '../../store/tableReducer'
import {eachDayOfInterval} from 'date-fns'
import {
    clearSelectedDays,
    setApartmentId,
    setCellDimensions,
    setEndSelection,
    setRentInterval,
    setSelecting,
    setStartSelection,
} from '../../store/tableHotelRoomsReducer'
import {adjustsInterval} from './utils/utils'


function mapStateToProps(state) {
    return {
        interval: state.table.interval,
        daysInTable: state.table.daysInTable,
        days: eachDayOfInterval(state.table.interval),
        isSelect: state.tableApartments.isSelect,
        selectInterval: adjustsInterval(state.tableApartments.selectInterval),
        apartmentId: state.tableApartments.apartmentId,
    }
}

const mapDispatchToProps = {
    shiftDateIntervalLeft,
    shiftDateIntervalRight,
    shiftDateIntervalFrom,
    shiftDateIntervalNow,
    setSelecting,
    setStartSelection,
    setEndSelection,
    setApartmentId,
    clearSelectedDays,
    setCellDimensions,
    setRentInterval,

}


export const TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table)
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
    leftSideShiftLeftViewRentInterval,
    leftSideShiftRightViewRentInterval,
    rightSideShiftLeftViewRentInterval,
    rightSideShiftRightViewRentInterval,
} from '../../store/tableHotelRoomsReducer'


function mapStateToProps(state) {
    return {
        table: state.table,
        days: eachDayOfInterval(state.table.interval),
        apartments: state.tableApartments.apartments,
        isSelect: state.tableApartments.isSelect,
        selectInterval: state.tableApartments.selectInterval,
        apartmentId: state.tableApartments.apartmentId,
        cellDimensions: state.tableApartments.cellDimensions,
        viewRentIntervals:state.tableApartments.viewRentIntervals
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
    leftSideShiftLeftViewRentInterval,
    leftSideShiftRightViewRentInterval,
    rightSideShiftLeftViewRentInterval,
    rightSideShiftRightViewRentInterval,

}


export const TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table)
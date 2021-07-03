import {connect} from "react-redux";
import {Table} from "./Table";
import {
    shiftDateIntervalFrom,
    shiftDateIntervalLeft,
    shiftDateIntervalNow,
    shiftDateIntervalRight
} from '../../store/tableReducer'
import {eachDayOfInterval} from 'date-fns'
import {clearSelectedDays, isSelectCells, selectedDayAC} from '../../store/tableHotelRoomsReducer'


function mapStateToProps(state) {
    return {
        table: state.table,
        // tableBody: state.tableApartments,
        days: eachDayOfInterval(state.table.interval),
        apartments: state.tableApartments.apartments,
        isSelect: state.tableApartments.isSelect,
        selectedDay: state.tableApartments.selectedDay,
    }
}

const mapDispatchToProps = {
    shiftDateIntervalLeft,
    shiftDateIntervalRight,
    shiftDateIntervalFrom,
    shiftDateIntervalNow,
    isSelectCells,
    selectedDayAC,
    clearSelectedDays,
}


export const TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table)
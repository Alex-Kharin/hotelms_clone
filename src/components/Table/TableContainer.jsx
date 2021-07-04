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
    clearSelectedDays, setApartmentId,
    setEndSelection,
    setSelecting,
    setStartSelection,
} from '../../store/tableHotelRoomsReducer'


function mapStateToProps(state) {
    return {
        table: state.table,
        days: eachDayOfInterval(state.table.interval),
        apartments: state.tableApartments.apartments,
        isSelect: state.tableApartments.isSelect,
        selectInterval: state.tableApartments.selectInterval,
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
}


export const TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table)
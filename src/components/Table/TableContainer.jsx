import {connect} from "react-redux";
import {Table} from "./Table";
import {
    shiftDateIntervalFrom,
    shiftDateIntervalLeft,
    shiftDateIntervalNow,
    shiftDateIntervalRight,
} from '../../store/tableReducer'
import {
    clearSelectedDays,
    setApartmentId,
    setCellDimensions,
    setEndSelection, setIsOpenModal,
    setRentInterval,
    setSelecting,
    setStartSelection,
} from '../../store/tableHotelRoomsReducer'
import {
    getApartmentId,
    getDaysInTable,
    getInterval,
    getIsSelect,
    getSelectInterval
} from '../../store/tableContainerSelectors'
import {eachDayOfInterval, set} from 'date-fns'
import {time} from '../../settings/settings'


function mapStateToProps(state) {
    return {
        interval: getInterval(state),
        daysInTable: getDaysInTable(state),
        // days: getDays(state), // WTF Bro?
        days: eachDayOfInterval(state.table.interval).map(day=>set(day, time)),
        isSelect: getIsSelect(state),
        selectInterval: getSelectInterval(state),
        apartmentId: getApartmentId(state),
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
    setIsOpenModal,

}


export const TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table)
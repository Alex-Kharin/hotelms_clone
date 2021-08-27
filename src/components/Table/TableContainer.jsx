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
    setEndSelection, setIsOpenModal,
    setRentInterval,
    setSelecting,
    setStartSelection,
} from '../../store/tableApartmentsReducer'
import {
    getApartmentId,
    getDaysInTable,
    getInterval,
    getIsSelect,
    getSelectInterval
} from '../../store/tableContainerSelectors'
import {getDays} from '../../store/tableBodyContainerSelectors'


function mapStateToProps(state) {
    return {
        interval: getInterval(state),
        daysInTable: getDaysInTable(state),
        days: getDays(state),
        // days: eachDayOfInterval(state.table.interval).map(day=>set(day, time)),
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
    setRentInterval,
    setIsOpenModal,

}


export const TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table)
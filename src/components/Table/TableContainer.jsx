import {connect} from "react-redux";
import {Table} from "./Table";
import {
    shiftDateIntervalFrom,
    shiftDateIntervalLeft,
    shiftDateIntervalNow,
    shiftDateIntervalRight
} from '../../store/tableReducer'
import {eachDayOfInterval} from 'date-fns'


function mapStateToProps(state) {
    return {
        table: state.table,
        tableBody: state.tableApartments,
        days: eachDayOfInterval(state.table.interval)
    }
}

const mapDispatchToProps = {shiftDateIntervalLeft, shiftDateIntervalRight, shiftDateIntervalFrom, shiftDateIntervalNow}


export const TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table)
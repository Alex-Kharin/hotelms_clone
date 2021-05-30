import {connect} from "react-redux";
import {Table} from "./Table";
import {
    shiftDateIntervalFrom,
    shiftDateIntervalLeft,
    shiftDateIntervalNow,
    shiftDateIntervalRight
} from '../../store/tableReducer'


function mapStateToProps(state) {
    return {
        table: state.table,
    }
}

const mapDispatchToProps = {shiftDateIntervalLeft, shiftDateIntervalRight, shiftDateIntervalFrom, shiftDateIntervalNow}


export const TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table)
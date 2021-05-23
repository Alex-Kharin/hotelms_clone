import React from "react";
import {connect} from "react-redux";
import {Table} from "./Table";


function mapStateToProps(state) {
    return {
        table: state.table,
    }
}

function mapDispatchToProps(dispatch) {
    return {
    
    }
}

export const TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table)
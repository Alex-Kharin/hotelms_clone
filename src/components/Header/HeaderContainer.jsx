import React from 'react'
import {connect} from 'react-redux'
import {changeDaysInTable} from '../../store/tableReducer'
import {Header} from './Header'
import {getDaysInTable} from '../../store/headerContainerSelector'

function mapStateToProps(state) {
    return {
        daysInTable: getDaysInTable(state),
    }
}

export const HeaderContainer = connect(mapStateToProps,    {changeDaysInTable})(Header)
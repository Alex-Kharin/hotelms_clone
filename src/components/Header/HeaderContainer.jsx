import React, {Component} from 'react'
import {connect} from 'react-redux'
import {changeDaysInTable} from '../../store/tableReducer'
import {Header} from './Header'

function mapStateToProps(state) {
    return {
        daysInTable: state.table.daysInTable,
    }
}

class HeaderContainer extends Component {
    render() {
        return (
            <Header
                daysInTable={this.props.daysInTable}
                changeDaysInTable={this.props.changeDaysInTable}
            />
        )
    }
}

export default connect(
    mapStateToProps,
    {changeDaysInTable}
)(HeaderContainer)
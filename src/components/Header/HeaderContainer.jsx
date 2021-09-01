import {connect} from 'react-redux'
import {changeDaysInTable} from '../../store/tableReducer'
import {Header} from './Header'
import {getDaysInTable, getIsAuth, getUser} from '../../store/headerContainerSelector'
import {logout} from '../../store/authReducer'

function mapStateToProps(state) {
    return {
        daysInTable: getDaysInTable(state),
        isAuth: getIsAuth(state),
        user: getUser(state)
    }
}

export const HeaderContainer = connect(mapStateToProps,    {changeDaysInTable, logout})(Header)
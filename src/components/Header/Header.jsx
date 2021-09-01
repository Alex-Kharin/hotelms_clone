import React from 'react'
import {MenuItem} from './MenuItem'
import {TableSettingsForm} from '../Forms/TableSettingsForm'
import {withModal} from '../Modal/withModal'
import styled from 'styled-components'
import {border, displayFlexAlignCenter, secondaryColor} from '../../settings/settings'
import {Icon} from '../simpleElements/Icon'
import {CommonSettingsForm} from '../Forms/CommonSettingsForm'
import {Report} from './Reports'
import {StyledLink} from '../simpleElements/StyledElements'
import {logout} from '../../store/authReducer'


const HeaderWrapper = styled.header`
  grid-area: header;
  border: ${border};
  background: ${secondaryColor};
  ${displayFlexAlignCenter};
  justify-content: space-between;
`

const LeftSideMenu = styled.nav`
  ${displayFlexAlignCenter};
  justify-content: flex-start;
`

const TableSettingsMenuItem = withModal(MenuItem)

export function Header(props) {
    const {daysInTable, changeDaysInTable, isAuth, logout, user} = props

    return (
        <HeaderWrapper>
            <LeftSideMenu>
                <StyledLink to="/"><Icon size={36}>hotel</Icon></StyledLink>

                <TableSettingsMenuItem iconName={'grid_on'} menuItemTitle={'Grid'}>
                    <TableSettingsForm daysInTable={daysInTable} changeDaysInTable={changeDaysInTable}/>
                </TableSettingsMenuItem>

                <TableSettingsMenuItem iconName={'settings'} menuItemTitle={'Settings'}>
                    <CommonSettingsForm />
                </TableSettingsMenuItem>

                <TableSettingsMenuItem iconName={'format_list_bulleted'} menuItemTitle={'Reports'}>
                    <Report />
                </TableSettingsMenuItem>
            </LeftSideMenu>

            <div>
                {!isAuth
                    ? <StyledLink to="/login"><MenuItem iconName={'login'}/></StyledLink>
                    : <div onClick={logout}><MenuItem iconName={'logout'} menuItemTitle={user}/></div>
                }
            </div>
        </HeaderWrapper>
    )
}
import React from 'react'
import {Icon} from '../simpleElements/Icon'
import styled from 'styled-components'
import {borderMix, displayFlexAlignCenter, menuItemColor} from '../../settings/settings'

const MenuItemWrapper = styled.div`
  ${displayFlexAlignCenter};
  justify-content: flex-start;
  border: ${borderMix( undefined,undefined,'#7693d5')} ;
  border-radius: 2px;
  background-color: ${menuItemColor};
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 2px 5px rgba(0,0,0,0.22);
  padding: 8px 0;
  margin: 0 2px;

  :hover {
    background-color: #87ee9d;
    cursor: pointer;
  }

  :active {
    box-shadow: inset 2px 2px 5px rgba(154, 147, 140, 0.5), 1px 1px 5px rgba(255, 255, 255, 1);
  }
`

const MenuItemIcon = styled(Icon)`
margin: 0 5px;
`

const MenuItemTitle = styled.span`
margin-right: 5px;
`

export function MenuItem(props) {
    const {openModal, iconName, menuItemTitle, } = props

    return (
        <MenuItemWrapper onClick={openModal}>
            <MenuItemIcon>{iconName}</MenuItemIcon>
            {menuItemTitle && <MenuItemTitle>{menuItemTitle}</MenuItemTitle>}
        </MenuItemWrapper>
    )
}
import React from "react"
import styled from "styled-components";
import {btnColor, gridAutoRowsHeight} from '../../settings/settings'
import {CommonIcon} from './Icon'

const Btn = styled.button`
  font-size: ${({size}) => size || '1.2em'};
  background-color: ${btnColor};
  border-radius: 3px;
  min-height: 30px;
  min-width: ${gridAutoRowsHeight};
  display: ${({isFlex}) => isFlex && 'flex'};
  align-items: ${({isFlex}) => isFlex && 'center'};
  z-index: ${({isFlex}) => isFlex && 505};
  type: ${({type}) => type};
  color: white;
`

export function Button(props) {
    const { onClick, size, isFlex, iconName, children, type} = props

    return (
        <Btn onClick={onClick} size={size} isFlex={isFlex} type={type}>
            {iconName && <CommonIcon>{iconName}</CommonIcon>}
            <span>{children}</span>
        </Btn>
    )
}
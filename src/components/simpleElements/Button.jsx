import React from "react"
import styled from "styled-components";
import {btnColor, btnHeaderZIndex, gridAutoRowsHeight} from '../../settings/settings'
import {CommonIcon} from './Icon'


const Btn = styled.button`
  font-size: ${({size}) => size || '1.2em'};
  background-color: ${({background}) => background || btnColor};
  border-radius: 3px;
  min-height: 30px;
  min-width: ${gridAutoRowsHeight};
  display: ${({isFlex}) => isFlex && 'flex'};
  align-items: ${({isFlex}) => isFlex && 'center'};
  z-index: ${({isFlex}) => isFlex && btnHeaderZIndex};
  color: white;
  opacity: ${props => props.disabled ? 0.3 : 1};
`

export function Button(props) {
    const { onClick, size, isFlex, iconName, children, type, background, isDisable} = props

    return (
        <Btn onClick={onClick} size={size} isFlex={isFlex} type={type} background={background} disabled={isDisable}>
            {iconName && <CommonIcon>{iconName}</CommonIcon>}
            {children && <span>{children}</span>}
        </Btn>
    )
}
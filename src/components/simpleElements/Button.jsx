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
  type: ${({type}) => type};
  color: white;
`

export function Button(props) {
    const { onClick, size, isFlex, iconName, children, type, background} = props

    return (
        <Btn onClick={onClick} size={size} isFlex={isFlex} type={type} background={background}>
            {iconName && <CommonIcon>{iconName}</CommonIcon>}
            <span>{children}</span>
        </Btn>
    )
}
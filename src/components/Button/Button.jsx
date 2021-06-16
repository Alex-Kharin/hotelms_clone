import React from "react"
import styled from "styled-components";

const Btn = styled.button`
  font-size: ${props => props.size || '1.2em'};
  background-color: #0277bd;
  border-radius: 3px;
  min-height: 30px;
  min-width: 40px;
  display: ${props => props.isFlex && 'flex'};
  align-items: ${props => props.isFlex && 'center'};
  z-index: ${props => props.isFlex && 505};
  color: white;
`

export function Button(props) {
    return (
        <Btn onClick={props.onClick} size={props.size} isFlex={props.isFlex}>
            {props.iconName && <span className="material-icons material-icons-outlined">{props.iconName}</span>}
            <span>{props.children}</span>
        </Btn>
    )
}
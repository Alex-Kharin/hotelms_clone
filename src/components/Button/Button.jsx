import React from "react"
import styled from "styled-components";

const Btn = styled.button`
  font-size: 1.2em;
  background-color: #0277bd;
  border-radius: 3px;
  min-height: 30px;
  min-width: 40px;
  display: flex;
  align-items: center
`

export function Button(props) {
    return (
        <Btn onClick={props.onClick}>
            <span className="material-icons material-icons-outlined">{props.iconName}</span>
            <span>{props.children}</span>
        </Btn>
    )
}
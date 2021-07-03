import React from "react";
import styled from 'styled-components'

const RentWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  border: 1px solid red;
  background-color: #9feaab;
  height: 36px;
  //width: ${props => props.expWidth * 5 + 5 * 2}px;
  z-index: 500;
`

export function Rent({children}) {
    return (
        <RentWrapper>{children}</RentWrapper>
    )
}
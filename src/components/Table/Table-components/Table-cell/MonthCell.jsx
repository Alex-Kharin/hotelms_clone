import styled from 'styled-components'
import React from 'react'


const Months = styled.div`
  grid-column: span ${props => props.daysInCurrentMonth};
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`

const MonthCellTitle = styled.strong`
  margin: auto 45px;
`

export function MonthCell(props) {
    return (
        <Months daysInCurrentMonth = {props.daysInCurrentMonth}>
            {props.leftBtn} <MonthCellTitle>{props.monthName} {props.yearOfDate}</MonthCellTitle> {props.rightBtn}
        </Months>
    )
}
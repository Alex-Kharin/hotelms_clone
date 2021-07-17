import styled from 'styled-components'
import React from 'react'
import {border, displayFlexAlignCenter} from '../../../settings/settings'


const Months = styled.div`
  grid-column: span ${props => props.daysInCurrentMonth};
  border: ${border};
  ${displayFlexAlignCenter};
  justify-content: ${props => props.daysInCurrentMonth > 3 ? 'space-between' : props.position};
  padding: 0 5px;
`

const MonthCellTitle = styled.strong`
  margin: auto 45px;
`

export function MonthCell(props) {
    const {daysInCurrentMonth, position, leftBtn, monthName, yearOfDate, rightBtn} = props

    return (
        <Months daysInCurrentMonth = {daysInCurrentMonth} position={position}>
            {leftBtn} {daysInCurrentMonth > 3 && <MonthCellTitle>{monthName} {yearOfDate}</MonthCellTitle>} {rightBtn}
        </Months>
    )
}
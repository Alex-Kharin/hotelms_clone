import React from "react";
import {TableHeader} from "./Table-components/Table-header/TableHeader";
import styled from "styled-components";
import {TableBody} from './Table-components/Table-body/TableBody'
import {isEqual} from 'date-fns'

const TableWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(250px, 6fr) repeat(${props => props.daysInTable}, minmax(40px, 1fr));
  grid-auto-rows: minmax(40px, auto);
  margin: 10px;
`
let id = 1

function handleRent(e, isSelectCells, clearSelectedDays) {
    if (e.type === "mousedown") {
        const date = e.target.closest('div').dataset.date

        id = e.target.closest('div').dataset.apartmentid

        console.log(date)
        isSelectCells(true)
        // expWidth = e.target.closest('div').clientWidth
        // console.log(e.target.closest('div').clientWidth)
    } else if (e.type === 'mouseup') {
        const date = e.target.closest('div').dataset.date
        console.log(date)
        isSelectCells(false)
        clearSelectedDays()
    }

}


function handleSelect(event, isSelect, selectedDayAC, selectedDay, ) {
    if (!isSelect) return
    let target = event.target.closest('div')
    const dayStr = target.dataset.date
    let apartmentId = target.dataset.apartmentid
    // const day = new Date(dateStr)
    // if (selectedDay.find(d=>isEqual(day,d))) return
    if (selectedDay.includes(dayStr) || apartmentId !== id) return

    if (isSelect && apartmentId === id) {
        selectedDayAC(dayStr)
    }
}

export function Table({days, ...props}) {
    const interval = props.table.interval
    return (
        <>
            <TableWrapper daysInTable={props.table.daysInTable + 1}>
                <TableHeader {...props} interval={interval} days={days}/>
            </TableWrapper>

            <TableWrapper daysInTable={props.table.daysInTable + 1}
                          onMouseDown={(e) => handleRent(e, props.isSelectCells, props.clearSelectedDays)}
                          onMouseUp={(e) => handleRent(e, props.isSelectCells, props.clearSelectedDays)}
                          onMouseOver={(e) => handleSelect(e, props.isSelect, props.selectedDayAC, props.selectedDay)}
            >
                {/*<TableBody apartments={props.tableBody} days={days} rentDay={expDate} expWidth={expWidth}/>*/}
                <TableBody apartments={props.apartments}
                           days={days}
                           selectedDay={props.selectedDay}
                           idx={id}
                           // isSelect={props.isSelect}
                />
            </TableWrapper>
        </>
    )
}
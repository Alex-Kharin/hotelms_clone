import React from "react";
import {TableHeader} from "./Table-components/Table-header/TableHeader";
import styled from "styled-components";
import {TableBody} from './Table-components/Table-body/TableBody'

const TableWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(250px, 6fr) repeat(${props => props.daysInTable}, minmax(40px, 1fr));
  grid-auto-rows: minmax(40px, auto);
  margin: 10px;
`

function handleRent(e) {
    console.log(e.target.closest('div').dataset.date)
}
export function Table({days, ...props}) {
    const interval = props.table.interval
    return (
        <>
            <TableWrapper daysInTable={props.table.daysInTable + 1}>
                <TableHeader {...props} interval={interval} days={days}/>
            </TableWrapper>

            <TableWrapper daysInTable={props.table.daysInTable + 1} onMouseDown={handleRent} onMouseUp={handleRent}>
                <TableBody apartments={props.tableBody} days={days}/>
            </TableWrapper>
        </>
    )
}
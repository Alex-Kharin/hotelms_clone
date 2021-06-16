import React from "react";
import {TableHeader} from "./Table-components/Table-header/TableHeader";
import styled from "styled-components";

const TableWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(250px, 6fr) repeat(${props => props.daysInTable}, minmax(40px, 1fr));
  grid-auto-rows: minmax(40px, auto);
  margin: 10px;
`

export function Table(props) {
    return (
        <TableWrapper daysInTable={props.table.daysInTable + 1}>
            <TableHeader {...props}/>
        </TableWrapper>
    )
}
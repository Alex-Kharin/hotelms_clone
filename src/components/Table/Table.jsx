import React from "react";
import {TableHeader} from "./Table-components/Table-header/TableHeader";
import styled from "styled-components";

const TableWrapper = styled.div`
  display: grid;
  grid-template-columns: minmax(200px, 6fr) repeat(30, minmax(40px, 1fr));
  grid-auto-rows: minmax(40px, auto);
  margin: 10px;
`

export function Table(props) {
    return (
        <TableWrapper>
            <TableHeader {...props}/>
        </TableWrapper>
    )
}
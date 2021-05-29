import React from "react";
import styled from "styled-components";

const CellWrapper = styled.div`
    border: 1px solid black;
    text-align: center;
    background-color: ${props => props.isWeekend ? 'lightblue' : 'inherit'};
`

const TopString = styled.span`
    color: midnightblue;
    font-weight: ${props => props.topStringFontWeight || 'bold'}
`

const BottomString = styled.span`
    color: gray;
    font-weight: ${props => props.bottomStringFontWeight || 'bold'}
`

export function TableCell(props) {
    const topString = props.topString ? <TopString>{props.topString}</TopString> : null
    const bottomString = props.bottomString ? <BottomString>{props.bottomString}</BottomString> : null
    return (
        <CellWrapper isWeekend={props.isWeekend}>
            {topString}
             <br/>
            {bottomString}
        </CellWrapper>
    )
}
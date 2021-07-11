import React from 'react'
import styled from 'styled-components'
import {TodayMarker} from '../Today-marker/TodayMarker'
import {Rent} from '../../Rent/Rent'


const CellWrapper = styled.div.attrs(props =>
    ({'data-date': props.date, 'data-apartment_id': props.apartmentId, 'data-apartments_type': props.apartmentsType}))`
  border: 1px solid black;
  text-align: center;
  background-color: ${props => props.isSelect ? '#e2c50a' : props.isWeekend ? 'lightblue' : 'inherit'};
  position: relative;
  user-select: none;

  :active {
    cursor: cell;
  }

`

const TopString = styled.span`
  color: midnightblue;
  font-weight: ${props => props.topStringFontWeight || 'bold'};
`

const BottomString = styled.span`
  color: gray;
  font-weight: ${props => props.bottomStringFontWeight || 'bold'};
`

export function TableCell(props) {
    const topString = props.topString ? <TopString>{props.topString}</TopString> : null
    const bottomString = props.bottomString ? <BottomString>{props.bottomString}</BottomString> : null
    return (
        <CellWrapper
            isWeekend={props.isWeekend}
            date={props.date}
            apartmentId={props.apartmentId}
            isSelect={props.isSelect}
            selectedDay={props.selectedDay}
            apartmentsType={props.apartmentsType}
        >
            {props.isToday && <TodayMarker/>}
            {props.isRent && <Rent cellDimensions={props.cellDimensions} viewRentInterval={props.isRent}
                                   isLeftArrow={props.isLeftArrow} isRightArrow={props.isRightArrow}>Ivanov Ivan</Rent>}
            {topString}
            <br/>
            {bottomString}
        </CellWrapper>
    )
}
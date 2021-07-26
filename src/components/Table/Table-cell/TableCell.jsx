import React from 'react'
import styled from 'styled-components'
import {TodayMarker} from '../TodayMarker'
import {Rent} from '../Rent'
import {border, selectionColor, weekendColor} from '../../../settings/settings'


const CellWrapper = styled.div.attrs(props =>
    ({'data-date': props.date, 'data-apartment_id': props.apartmentId, 'data-apartments_type': props.apartmentsType}))`
  position: relative;
  text-align: center;
  user-select: none;
  border: ${props => props.isSelect ? 'none' : border};
  background-color: ${props => props.isSelect ? selectionColor : props.isWeekend ? weekendColor : 'inherit'};
  cursor: ${props => props.isSelect ? 'cell' : null};
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
    const {isWeekend, date, apartmentId, isSelect, apartmentsType, isToday, isRent, isLeftArrow, isRightArrow} = props

    const topString = props.topString ? <TopString>{props.topString}</TopString> : null
    const bottomString = props.bottomString ? <BottomString>{props.bottomString}</BottomString> : null

    return (
        <CellWrapper
            isWeekend={isWeekend}
            date={date}
            apartmentId={apartmentId}
            isSelect={isSelect}
            apartmentsType={apartmentsType}
        >
            {isToday && <TodayMarker/>}
            {isRent && <Rent cellDimensions={props.cellDimensions} viewRentInterval={isRent}
                                   isLeftArrow={isLeftArrow} isRightArrow={isRightArrow}>Ivanov Ivan</Rent>}
            {topString}
            <br/>
            {bottomString}
        </CellWrapper>
    )
}
import React from "react";
import {TableHeader} from "./Table-components/Table-header/TableHeader";
import styled from "styled-components";
import {TableBody} from './Table-components/Table-body/TableBody'
import {adjustsInterval} from './utils/utils'


const TableWrapper = styled.div`
  display: grid;
  //grid-template-columns: minmax(250px, 6fr) repeat(${props => props.daysInTable}, minmax(40px, 1fr));
  grid-template-columns: 250px repeat(${props => props.daysInTable}, 50px);
  grid-auto-rows: minmax(40px, auto);
  margin: 10px;
`

export function Table({days, ...props}) {
    const interval = props.table.interval

    function handleSelect(event) {
        const target = event.target.closest('div')
        const dayStr = target.dataset.date

        if (dayStr) {
            const day = new Date(dayStr)

            if (event.type === 'mousedown') {
                props.setCellDimensions({width: target.clientWidth, height: target.clientHeight})
                props.setApartmentId(target.dataset.apartment_id)
                props.setSelecting(true)
                props.setStartSelection(day)
            } else if (event.type === 'mouseup') {
                props.setRentInterval(target.dataset.apartments_type, target.dataset.apartment_id, adjustsInterval(props.selectInterval))
                props.clearSelectedDays()
                props.setSelecting(false)
            }
        }
    }

    function updateSelection(event) {
        if (props.isSelect && event.target.dataset.apartment_id === props.apartmentId) {
            let target = event.target
            let dayStr = target.dataset.date

            if (dayStr) {
                const day = new Date(dayStr)
                props.setEndSelection(day)
            }
        }
    }

    return (
        <>
            <TableWrapper daysInTable={props.table.daysInTable + 1}>
                <TableHeader {...props} interval={interval} days={days}/>
            </TableWrapper>

            <TableWrapper daysInTable={props.table.daysInTable + 1}
                          onMouseDown={handleSelect}
                          onMouseUp={handleSelect}
                          onMouseOver={updateSelection}
            >
                <TableBody apartments={props.apartments}
                           days={days}
                           selectedDay={props.selectedDay}
                           apartmentId={props.apartmentId}
                           selectInterval={props.selectInterval}
                           cellDimensions={props.cellDimensions}
                           viewRentIntervals={props.viewRentIntervals}
                           leftSideShiftLeftViewRentInterval={props.leftSideShiftLeftViewRentInterval}
                           leftSideShiftRightViewRentInterval={props.leftSideShiftRightViewRentInterval}
                           rightSideShiftLeftViewRentInterval={props.rightSideShiftLeftViewRentInterval}
                           rightSideShiftRightViewRentInterval={props.rightSideShiftRightViewRentInterval}
                />
            </TableWrapper>
        </>
    )
}
import React from "react";
import {TableHeader} from "./Table-components/Table-header/TableHeader";
import styled from "styled-components";
import {adjustsInterval} from './utils/utils'
import {isSameDay} from 'date-fns'
import {TableBodyContainer} from './Table-components/Table-body/TableBodyContainer'


const TableWrapper = styled.div`
  display: grid;
  //grid-template-columns: minmax(250px, 6fr) repeat(${props => props.daysInTable}, minmax(40px, 1fr));
  grid-template-columns: 250px repeat(${props => props.daysInTable}, 50px);
  grid-auto-rows: minmax(40px, auto);
  margin: 10px;
`

export function Table(props) {

    const {days, interval, setCellDimensions, setApartmentId, setSelecting, setStartSelection,
        selectInterval, setRentInterval, clearSelectedDays, isSelect, apartmentId, setEndSelection,
        daysInTable} = props

    function handleSelect(event) {
        const target = event.target.closest('div')
        const dayStr = target.dataset.date

        if (dayStr) {
            const day = new Date(dayStr)

            if (event.type === 'mousedown') {
                setCellDimensions({width: target.clientWidth, height: target.clientHeight})
                setApartmentId(target.dataset.apartment_id)
                setSelecting(true)
                setStartSelection(day)
            } else if (event.type === 'mouseup') {
                if (selectInterval.start && selectInterval.end && !isSameDay(selectInterval.start, selectInterval.end))
                {
                    setRentInterval(target.dataset.apartments_type, target.dataset.apartment_id, adjustsInterval(selectInterval))
                }
                clearSelectedDays()
                setSelecting(false)
            }
        }
    }

    function updateSelection(event) {
        if (isSelect && event.target.dataset.apartment_id === apartmentId) {
            let target = event.target
            let dayStr = target.dataset.date

            if (dayStr) {
                const day = new Date(dayStr)
                setEndSelection(day)
            }
        }
    }

    return (
        <>
            <TableWrapper daysInTable={daysInTable + 1}>
                <TableHeader {...props} interval={interval} days={days}/>
            </TableWrapper>

            <TableWrapper daysInTable={daysInTable + 1}
                          onMouseDown={handleSelect}
                          onMouseUp={handleSelect}
                          onMouseOver={updateSelection}
            >
                <TableBodyContainer days={days}
                                    selectInterval={selectInterval}
                                    apartmentId={apartmentId}
                />
            </TableWrapper>
        </>
    )
}
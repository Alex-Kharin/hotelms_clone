import React from 'react'
import {TableHeader} from './TableHeader'
import styled from 'styled-components'
import {adjustsInterval} from './utils/utils'
import {isSameDay} from 'date-fns'
import TableBodyContainer from './TableBodyContainer'
import {gridAutoRowsHeight, gridColumnsWidth, gridTemplateFirstColumnWidth} from '../../settings/settings'


const TableWrapper = styled.div`
  display: grid;
  grid-template-columns: ${gridTemplateFirstColumnWidth} repeat(${props => props.daysInTable}, ${gridColumnsWidth}px);
  grid-auto-rows: minmax(${gridAutoRowsHeight}px, auto);
  margin: 10px 10px -9px 10px;
`

export function Table(props) {

    const {days, interval, setApartmentId, setSelecting, setStartSelection,
        selectInterval, setRentInterval, clearSelectedDays, isSelect, apartmentId, setEndSelection,
        daysInTable, setIsOpenModal,
    } = props

    function handleSelect(event) {
        const target = event.target.closest('div')
        const dayStr = target.dataset.date
        if (dayStr) {
            const day = new Date(dayStr)

            if (event.type === 'mousedown') {
                setApartmentId(target.dataset.apartment_id)
                setSelecting(true)
                setStartSelection(day)
            } else if (event.type === 'mouseup') {
                if (selectInterval.start
                    && selectInterval.end
                    && !isSameDay(selectInterval.start, selectInterval.end)
                    && target.dataset.apartment_id === apartmentId)
                {
                    setRentInterval(target.dataset.apartments_type, adjustsInterval(selectInterval))
                    setIsOpenModal(true)
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
                <TableBodyContainer selectInterval={selectInterval}
                                    apartmentId={apartmentId}
                                    interval={interval}
                />
            </TableWrapper>
        </>
    )
}

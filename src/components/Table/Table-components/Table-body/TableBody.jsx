import React from 'react'
import {isBefore, isEqual, isWeekend, isWithinInterval} from 'date-fns'
import {TableCell} from '../Table-cell/TableCell'
import {dayOfMonth} from '../../utils/utils'
import {TableRow} from '../Table-row/TableRow'
import styled from 'styled-components'

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.position ? props.position : 'center'};
  background-color: ${props => props.isWeekend ? 'lightblue' : 'inherit'};
  font-weight: ${props => props.weight ? props.weight : 600};
  border: 1px solid black;
  padding-left: ${props => props.position ? '1em' : null};
`

function ApartmentsRowsByNumbers({days, apartmentsByType, rentDay, apartmentIdForSelect, selectInterval}) {

    const correctSelectInterval = isBefore(selectInterval.end, selectInterval.start)
        ? {start: selectInterval.end, end: selectInterval.start}
        : selectInterval

    const bodyDaysCells = (id, days) => days.map(day =>
        <TableCell
            bottomString={dayOfMonth(day)}
            isWeekend={isWeekend(day)}
            date={day}
            key={day}
            isRent={isEqual(day, rentDay)}
            apartmentId={id}
            isSelect={
                correctSelectInterval.start
                ? isWithinInterval(day, correctSelectInterval) && apartmentIdForSelect === id
                : false
            }
        />)

    const rows = Object.keys(apartmentsByType).map(apartmentId => {
        return (
            <>
                <Cell position={'flex-start'} weight={500} key={apartmentsByType[apartmentId].apartmentsNumber}>{apartmentsByType[apartmentId].apartmentsNumber}</Cell>
                {bodyDaysCells(apartmentId, days)}
            </>)
    })

    return <>{rows}</>
}

export function TableBody({days, apartments, rentDay, isSelect, selectedDay, selectInterval, apartmentId}) {

    const freeApartmentsCells = days.map(day => {
        return <Cell isWeekend={isWeekend(day)} weight={800} key={day}> 0 </Cell>
    })

    return (
        <>
            {Object.keys(apartments).map(key =>
                <React.Fragment key={key}>
                    <TableRow rowCells={freeApartmentsCells} rowTitle={<Cell>{key}</Cell>} />
                    <ApartmentsRowsByNumbers
                        days={days}
                        apartmentsByType={apartments[key]}
                        rentDay={rentDay}
                        isSelect={isSelect}
                        selectedDay={selectedDay}
                        apartmentIdForSelect={apartmentId}
                        selectInterval={selectInterval}
                    />
                </React.Fragment>)}
        </>
    )
}
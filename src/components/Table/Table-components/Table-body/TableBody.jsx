import React from 'react'
import {isWeekend} from 'date-fns'
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

function ApartmentsRowsByNumbers({days, apartmentsByType}) {

    const bodyDaysCells = days.map(day =>
        <TableCell
            bottomString={dayOfMonth(day)}
            isWeekend={isWeekend(day)}
            date={day}
            key={day}
        />)

    const apartmentNumbersCells = apartmentsByType.map(apartment =>
        <Cell position={'flex-start'} weight={500} key={apartment.apartmentsNumber}>{apartment.apartmentsNumber}</Cell>)

    return (
        <>
            {apartmentNumbersCells.map(apartmentNumber =>
                <TableRow rowTitle={apartmentNumber} rowCells={bodyDaysCells} key={apartmentNumber.key + 'uid'}/>)}
        </>
    )
}

export function TableBody({days, apartments}) {

    const freeApartmentsCells = days.map(day => {
        return <Cell isWeekend={isWeekend(day)} weight={800} key={day}> 0 </Cell>
    })

    return (
        <>
            {Object.keys(apartments).map(key =>
                <React.Fragment key={key}>
                    <TableRow rowCells={freeApartmentsCells} rowTitle={<Cell>{key}</Cell>} />
                    <ApartmentsRowsByNumbers days={days} apartmentsByType={apartments[key]} />
                </React.Fragment>)}
        </>
    )
}
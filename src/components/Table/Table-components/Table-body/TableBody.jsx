import React from 'react'
import {format, isEqual, isToday, isWeekend} from 'date-fns'
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

function ApartmentsRowsByNumbers({days, apartmentsByType, rentDay, selectedDay, idx}) {

    const bodyDaysCells = (id, days) => days.map(day =>
        <TableCell
            bottomString={dayOfMonth(day)}
            isWeekend={isWeekend(day)}
            date={day}
            key={day}
            isRent={isEqual(day, rentDay)}
            apartmentId={id}
            isSelect={selectedDay.includes(format(day, 'dd-MM-yyyy')) && id === idx}
        />)

    const rows = Object.keys(apartmentsByType).map(apartmentId => {
        return (
            <>
                <Cell position={'flex-start'} weight={500} key={apartmentsByType[apartmentId].apartmentsNumber}>{apartmentsByType[apartmentId].apartmentsNumber}</Cell>
                {bodyDaysCells(apartmentId, days)}
            </>)
    })

    // const apartmentNumbersCells = Object.values(apartmentsByType).map(apartment =>
    //     <Cell position={'flex-start'} weight={500} key={apartment.apartmentsNumber}>{apartment.apartmentsNumber}</Cell>)

    return ( <>{rows}</>
        // <>
        //     {apartmentNumbersCells.map(apartmentNumber =>
        //         <TableRow rowTitle={apartmentNumber} rowCells={bodyDaysCells} key={apartmentNumber.key + 'uid'}/>)}
        // </>
    )
}

export function TableBody({days, apartments, rentDay, isSelect, selectedDay, idx}) {

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
                        idx={idx}
                    />
                </React.Fragment>)}
        </>
    )
}
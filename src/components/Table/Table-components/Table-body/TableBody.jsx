import React, {useEffect} from 'react'
import {isBefore, isEqual, isSameDay, isWeekend} from 'date-fns'
import {TableCell} from '../Table-cell/TableCell'
import {adjustsInterval, dayOfMonth, isSelectInterval} from '../../utils/utils'
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

function ApartmentsRowsByNumbers({
                                     days,
                                     apartmentsByType,
                                     apartmentsType,
                                     apartmentIdForSelect,
                                     selectInterval,
                                     cellDimensions,
                                     viewRentIntervals,
                                     leftSideShiftLeftViewRentInterval,
                                     leftSideShiftRightViewRentInterval,
                                     rightSideShiftLeftViewRentInterval,
                                     rightSideShiftRightViewRentInterval,
                                 }) {
    useEffect(() => {
        if (isBefore(viewRentIntervals[1]?.start, days[0])) {
            leftSideShiftLeftViewRentInterval(1)
        }
        if (!isSameDay(viewRentIntervals[1]?.start, apartmentsByType[1].rentInterval?.start) && isBefore(days[0], viewRentIntervals[1]?.start)) {
            leftSideShiftRightViewRentInterval(1)
        }
        if (isBefore(days[days.length-1], viewRentIntervals[1]?.end)) {
            rightSideShiftLeftViewRentInterval(1)
        }
        if (!isSameDay(viewRentIntervals[1]?.end, apartmentsByType[1].rentInterval?.end) && isBefore(viewRentIntervals[1]?.end, days[days.length-1])) {
            rightSideShiftRightViewRentInterval(1)
        }
        if (isSameDay(viewRentIntervals[1]?.start, viewRentIntervals[1]?.end)) return
    }, [days])

    const correctSelectInterval = adjustsInterval(selectInterval)

    function bodyDaysCells(id, apartmentsType, days) {
        return days.map(day => {
            return <TableCell
                bottomString={dayOfMonth(day)}
                isWeekend={isWeekend(day)}
                date={day}
                key={day}
                isRent={isEqual(day, viewRentIntervals[id]?.start)}
                apartmentId={id}
                apartmentsType={apartmentsType}
                cellDimensions={cellDimensions}
                viewRentIntervals={viewRentIntervals}
                isSelect={isSelectInterval(correctSelectInterval, day, apartmentIdForSelect, id)}
                isLeftArrow={isBefore(apartmentsByType[1].rentInterval.start, viewRentIntervals[1]?.start)}
                isRightArrow={isBefore(viewRentIntervals[1]?.end, apartmentsByType[1].rentInterval.end)}
            />
        })
    }

    return (
        <>
            {Object.keys(apartmentsByType).map(apartmentId => {
                return (
                    <React.Fragment key={apartmentId}>
                        <Cell position={'flex-start'} weight={500}
                              key={apartmentsByType[apartmentId].apartmentsNumber}>{apartmentsByType[apartmentId].apartmentsNumber}</Cell>
                        {bodyDaysCells(apartmentId, apartmentsType, days)}
                    </React.Fragment>)
            })}
        </>
    )
}

export function TableBody({
                              days,
                              apartments,
                              rentDay,
                              isSelect,
                              selectedDay,
                              selectInterval,
                              apartmentId,
                              cellDimensions,
                              viewRentIntervals,
                              leftSideShiftLeftViewRentInterval,
                              leftSideShiftRightViewRentInterval,
                              rightSideShiftLeftViewRentInterval,
                              rightSideShiftRightViewRentInterval,
                          }) {

    const freeApartmentsCells = days.map(day => {
        return <Cell isWeekend={isWeekend(day)} weight={800} key={day}> 0 </Cell>
    })

    return (
        <>
            {Object.keys(apartments).map(key =>
                <React.Fragment key={key}>
                    <TableRow rowCells={freeApartmentsCells} rowTitle={<Cell>{key}</Cell>}/>
                    <ApartmentsRowsByNumbers
                        days={days}
                        apartmentsByType={apartments[key]}
                        apartmentsType={key}
                        rentDay={rentDay}
                        isSelect={isSelect}
                        selectedDay={selectedDay}
                        apartmentIdForSelect={apartmentId}
                        selectInterval={selectInterval}
                        cellDimensions={cellDimensions}
                        viewRentIntervals={viewRentIntervals}
                        leftSideShiftLeftViewRentInterval={leftSideShiftLeftViewRentInterval}
                        leftSideShiftRightViewRentInterval={leftSideShiftRightViewRentInterval}
                        rightSideShiftLeftViewRentInterval={rightSideShiftLeftViewRentInterval}
                        rightSideShiftRightViewRentInterval={rightSideShiftRightViewRentInterval}
                    />
                </React.Fragment>)}
        </>
    )
}
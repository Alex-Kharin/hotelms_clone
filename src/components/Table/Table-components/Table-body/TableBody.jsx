import React, {useEffect} from 'react'
import {areIntervalsOverlapping, isBefore, isSameDay, isWeekend, isWithinInterval} from 'date-fns'
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
        Object.keys(viewRentIntervals).forEach(id => {
            if (id in apartmentsByType) {
                for (let i = 0; i < viewRentIntervals[id]?.length; i++) {
                    if (!isSameDay(viewRentIntervals[id][i]?.start, viewRentIntervals[id][i]?.end) && isBefore(viewRentIntervals[id][i]?.start, days[0])) {
                        leftSideShiftLeftViewRentInterval(id, i)
                    }
                    if (!isSameDay(viewRentIntervals[id][i]?.start, apartmentsByType[id].rentInterval[i]?.start) && isBefore(days[0], viewRentIntervals[id][i]?.start)) {
                        leftSideShiftRightViewRentInterval(id, i)
                    }
                    if (isBefore(days[days.length - 1], viewRentIntervals[id][i]?.end)) {
                        rightSideShiftLeftViewRentInterval(id, i)
                    }
                    if (!isSameDay(viewRentIntervals[id][i]?.end, apartmentsByType[id].rentInterval[i]?.end) && isBefore(viewRentIntervals[id][i]?.end, days[days.length - 1])) {
                        rightSideShiftRightViewRentInterval(id, i)
                    }
                }
            }
        })
    }, [days])

    const correctSelectInterval = adjustsInterval(selectInterval)
    let index = null


    function isRentBlya(array, day) {
        for (let i=0; i<array?.length; i++) {
            if (isSameDay(day, array[i].start) && !isSameDay(array[i].start, array[i].end)) {
                index = i
                return array[i]
            } else continue
        }
    }


    function bodyDaysCells(id, apartmentsType, days) {
        return days.map(day => {
            return <TableCell
                bottomString={dayOfMonth(day)}
                isWeekend={isWeekend(day)}
                date={day}
                key={day}
                // isRent={isEqual(day, viewRentIntervals[id]?.start)}
                isRent={isRentBlya(viewRentIntervals[id], day)}
                // isRent={viewRentIntervals[id]?.some(interval => isEqual(day, interval.start))}
                apartmentId={id}
                apartmentsType={apartmentsType}
                cellDimensions={cellDimensions}
                // viewRentIntervals={viewRentIntervals}
                isSelect={isSelectInterval(correctSelectInterval, day, apartmentIdForSelect, id)}
                isLeftArrow={index !== null && viewRentIntervals[id] && isBefore(apartmentsByType[id]?.rentInterval[index]?.start, viewRentIntervals[id][index]?.start)}
                isRightArrow={index !== null && viewRentIntervals[id] && isBefore(viewRentIntervals[id][index]?.end, apartmentsByType[id]?.rentInterval[index]?.end)}
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

    const freeApartmentsCells = (apartmentsByType) => days.map(day => {
        let freeApartments = Object.keys(apartmentsByType).length
        Object.values(apartmentsByType).forEach(apartment => {
            if (apartment.rentInterval.some((interval, i, a) => areIntervalsOverlapping({start: day, end: day}, interval, {inclusive: false}) ||
                (isSameDay(day, interval.end) && apartment.rentInterval.some(int => isSameDay(day, int.start)))
            )) {
                freeApartments--
            }

        })
        return <Cell isWeekend={isWeekend(day)} weight={800} key={day}> {freeApartments} </Cell>
    })

    return (
        <>
            {Object.keys(apartments).map(key =>
                <React.Fragment key={key}>
                    <TableRow rowCells={freeApartmentsCells(apartments[key])} rowTitle={<Cell>{key}</Cell>}/>
                    <ApartmentsRowsByNumbers
                        days={days}
                        apartmentsByType={apartments[key]}
                        apartmentsType={key}
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
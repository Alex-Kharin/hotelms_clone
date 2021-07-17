import React, {useEffect} from 'react'
import {areIntervalsOverlapping, isBefore, isSameDay, isWeekend, } from 'date-fns'
import {TableCell} from '../Table-cell/TableCell'
import {dayOfMonth, isArrow, isDayStartRentalInterval, isSelectInterval} from '../utils/utils'
import {TableRow} from '../Table-row/TableRow'
import styled from 'styled-components'
import {border, displayFlexAlignCenter, weekendColor} from '../../../settings/settings'


const Cell = styled.div`
  ${displayFlexAlignCenter};
  border: ${border};
  justify-content: ${({position}) => position ? position : 'center'};
  background-color: ${({isWeekend}) => isWeekend ? weekendColor : 'inherit'};
  font-weight: ${({weight}) => weight ? weight : 600};
  padding-left: ${({position}) => position ? '1em' : null};
`

export function TableBody(props) {
    const {
        days, apartments, selectInterval, apartmentId, cellDimensions, viewRentIntervals,
        leftSideShiftLeftViewRentInterval, leftSideShiftRightViewRentInterval, rightSideShiftLeftViewRentInterval,
        rightSideShiftRightViewRentInterval,
    } = props

    const freeApartmentsCells = (apartmentsByType) => days.map(day => {
        let freeApartments = Object.keys(apartmentsByType).length

        Object.values(apartmentsByType).forEach(apartment => {
            if (apartment.rentInterval.some(interval => areIntervalsOverlapping({
                    start: day,
                    end: day
                }, interval, {inclusive: false}) ||
                (isSameDay(day, interval.end) && apartment.rentInterval.some(int => isSameDay(day, int.start)))
            )) {
                freeApartments--
            }

        })
        return <Cell isWeekend={isWeekend(day)} weight={800} key={day}> {freeApartments} </Cell>
    })

    return (
        <>
            {Object.keys(apartments).map(apartmentsType =>
                <React.Fragment key={apartmentsType}>
                    <TableRow rowCells={freeApartmentsCells(apartments[apartmentsType])} rowTitle={<Cell>{apartmentsType}</Cell>}/>
                    <ApartmentsRowsByNumbers
                        days={days}
                        apartmentsByType={apartments[apartmentsType]}
                        apartmentsType={apartmentsType}
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

function ApartmentsRowsByNumbers(props) {
    const {
        days, apartmentsByType, apartmentsType, apartmentIdForSelect, selectInterval, cellDimensions, viewRentIntervals,
        leftSideShiftLeftViewRentInterval, leftSideShiftRightViewRentInterval, rightSideShiftLeftViewRentInterval,
        rightSideShiftRightViewRentInterval,
    } = props

    useEffect(() => {
        Object.keys(viewRentIntervals).forEach(id => {
            if (id in apartmentsByType) {
                for (let i = 0; i < viewRentIntervals[id]?.length; i++) {

                    const {start, end} = viewRentIntervals[id][i]
                    const apartmentRentInterval = apartmentsByType[id].rentInterval[i]
                    const firstTableDay = days[0]
                    const lastTableDay = days[days.length - 1]

                    if (!isSameDay(start, end) && isBefore(start, firstTableDay)) {
                        leftSideShiftLeftViewRentInterval(id, i)
                    }
                    if (isBefore(lastTableDay, end)) {
                        rightSideShiftLeftViewRentInterval(id, i)
                    }
                    if (!isSameDay(start, apartmentRentInterval?.start) && isBefore(firstTableDay, start)) {
                        leftSideShiftRightViewRentInterval(id, i)
                    }
                    if (!isSameDay(end, apartmentRentInterval?.end) && isBefore(end, lastTableDay)) {
                        rightSideShiftRightViewRentInterval(id, i)
                    }
                }
            }
        })
    }, [days])

    function bodyDaysCells(id, apartmentsType, days) {
        return days.map(day => {
            let [isRent, index] = isDayStartRentalInterval(viewRentIntervals[id], day) || [false, false]
            return <TableCell
                bottomString={dayOfMonth(day)}
                isWeekend={isWeekend(day)}
                date={day}
                key={day}
                isRent={isRent}
                apartmentId={id}
                apartmentsType={apartmentsType}
                cellDimensions={cellDimensions}
                isSelect={isSelectInterval(selectInterval, day, apartmentIdForSelect, id)}
                isLeftArrow={isArrow(viewRentIntervals, apartmentsByType, id, index, 'start')}
                isRightArrow={isArrow(viewRentIntervals, apartmentsByType, id, index, 'end')}
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

import React, {useEffect} from 'react'
import {areIntervalsOverlapping, isSameDay, isWeekend, } from 'date-fns'
import {TableCell} from './Table-cell/TableCell'
import {
    dayOfMonth,
    isArrow,
    isDayBefore,
    isDayStartRentalInterval,
    isSelectInterval
} from './utils/utils'
import {TableRow} from './TableRow'
import styled from 'styled-components'
import {border, displayFlexAlignCenter, weekendColor} from '../../settings/settings'


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
        rightSideShiftRightViewRentInterval, setRentInfo, tariffs, isOpenModal, setIsOpenModal, cancelRent,
    } = props

    const freeApartmentsCells = (apartmentsByType) => days.map(day => {
        let freeApartments = Object.keys(apartmentsByType).length

        Object.values(apartmentsByType).forEach(apartment => {
            if (apartment.rentInfo.some(item => areIntervalsOverlapping({
                    start: day,
                    end: day
                }, item.rentInterval, {inclusive: false}) ||
                (isSameDay(day, item.rentInterval.end) && apartment.rentInfo.some(element => isSameDay(day, element.rentInterval.start)))
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
                        setRentInfo={setRentInfo}
                        tariffs={tariffs}
                        isOpenModal={isOpenModal}
                        setIsOpenModal={setIsOpenModal}
                        cancelRent={cancelRent}
                    />
                </React.Fragment>)}
        </>
    )
}

function ApartmentsRowsByNumbers(props) {
    const {
        days, apartmentsByType, apartmentsType, apartmentIdForSelect, selectInterval, cellDimensions, viewRentIntervals,
        leftSideShiftLeftViewRentInterval, leftSideShiftRightViewRentInterval, rightSideShiftLeftViewRentInterval,
        rightSideShiftRightViewRentInterval, setRentInfo, tariffs, isOpenModal, setIsOpenModal, cancelRent,
    } = props

    useEffect(() => {
        Object.keys(viewRentIntervals).forEach(id => {
            if (id in apartmentsByType) {
                for (let i = 0; i < viewRentIntervals[id]?.length; i++) {

                    const {start, end} = viewRentIntervals[id][i]
                    const apartmentRentInterval = apartmentsByType[id].rentInfo[i].rentInterval
                    const firstTableDay = days[0]
                    const lastTableDay = days[days.length - 1]

                    if (!isSameDay(start, end) && isDayBefore(start, firstTableDay)) {
                        leftSideShiftLeftViewRentInterval(id, i)
                    }
                    if (!isSameDay(lastTableDay, end) && isDayBefore(lastTableDay, end)) {
                        rightSideShiftLeftViewRentInterval(id, i)
                    }
                    if (!isSameDay(start, apartmentRentInterval?.start) && isDayBefore(firstTableDay, start)) {
                        leftSideShiftRightViewRentInterval(id, i)
                    }
                    if (!isSameDay(end, apartmentRentInterval?.end) && isDayBefore(end, lastTableDay)) {
                        rightSideShiftRightViewRentInterval(id, i)
                    }
                }
            }
        })
    }, [days, viewRentIntervals, apartmentsByType])

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
                rentInfo={apartmentsByType[id]?.rentInfo[index]}
                index={index}
                isSelect={isSelectInterval(selectInterval, day, apartmentIdForSelect, id)}
                isLeftArrow={isArrow(viewRentIntervals, apartmentsByType, id, index, 'start')}
                isRightArrow={isArrow(viewRentIntervals, apartmentsByType, id, index, 'end')}
                setRentInfo={setRentInfo}
                tariffs={tariffs}
                numberOfPersons={apartmentsByType[id].numberOfPersons}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                cancelRent={cancelRent}
            />
        })
    }

    return (
        <>
            {Object.keys(apartmentsByType)
                .sort((a,b)=>apartmentsByType[a].numberOfPersons - apartmentsByType[b].numberOfPersons)
                .map(apartmentId => {
                return (
                    <React.Fragment key={apartmentId}>
                        <Cell position={'flex-start'} weight={500}
                              key={apartmentsByType[apartmentId].apartmentsNumber}
                        >
                            {apartmentsByType[apartmentId].apartmentsNumber} ({apartmentsByType[apartmentId].numberOfPersons})
                        </Cell>
                        {bodyDaysCells(apartmentId, apartmentsType, days)}
                    </React.Fragment>)
            })}
        </>
    )
}

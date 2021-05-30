import React from 'react'
import {TableCell} from '../Table-cell/TableCell'
import {eachMonthOfInterval, isToday, isWeekend} from 'date-fns'
import {TableRow} from '../Table-row/TableRow'
import {dayOfMonth, dayOfWeek, now, toMonths} from '../../utils/utils'
import {FirstHeaderCell} from '../Table-cell/FirstHeaderCell'


export function TableHeader(props) {
    const days = props.table.days
    const fromDay = props.table.from
    const shiftLeft = props.shiftDateIntervalLeft
    const shiftRight = props.shiftDateIntervalRight
    const shiftNow = props.shiftDateIntervalNow
    const shiftFrom = props.shiftDateIntervalFrom

    const startInterval = days[0]
    const endInterval = days[days.length - 1]
    const months = eachMonthOfInterval({start: startInterval, end: endInterval})

    const headerDaysCells = days.map(day =>
        <TableCell
            topString={dayOfMonth(day)}
            bottomString={dayOfWeek(day)}
            isWeekend={isWeekend(day)}
            isToday={isToday(day)}
            key={day}
        />)

    const monthsCells = months.map(toMonths(days, months, shiftLeft, shiftRight))

    return (
        <>
            <FirstHeaderCell now={now} onClick={shiftNow} shiftFrom={shiftFrom} fromDay={fromDay}/>
            <TableRow rowCells={monthsCells}/>
            <TableRow rowCells={headerDaysCells}/>
        </>
    )
}
import React from 'react'
import {TableCell} from '../Table-cell/TableCell'
import {eachMonthOfInterval, isWeekend} from 'date-fns'
import {TableRow} from '../Table-row/TableRow'
import {dayOfMonth, dayOfWeek, now, toMonths} from '../../utils/utils'
import {FirstHeaderCell} from '../Table-cell/FirstHeaderCell'


export function TableHeader(props) {
    const days = props.table.days
    const shiftLeft = props.shiftDateIntervalLeft
    const shiftRight = props.shiftDateIntervalRight
    const shiftNow = props.shiftDateIntervalNow

    const startInterval = days[0]
    const endInterval = days[days.length - 1]
    const months = eachMonthOfInterval({start: startInterval, end: endInterval})

    const headerDaysCells = days.map(day =>
        <TableCell
            topString={dayOfMonth(day)}
            bottomString={dayOfWeek(day)}
            isWeekend={isWeekend(day)}
            key={day}
        />)

    const monthsCells = months.map(toMonths(days, months, shiftLeft, shiftRight))

    return (
        <>
            <FirstHeaderCell now={now} onClick={shiftNow}/>
            <TableRow rowCells={monthsCells}/>
            <TableRow rowCells={headerDaysCells}/>
        </>
    )
}
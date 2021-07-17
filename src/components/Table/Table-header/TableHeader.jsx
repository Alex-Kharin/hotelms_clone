import React from 'react'
import {TableCell} from '../Table-cell/TableCell'
import {eachMonthOfInterval, isToday, isWeekend} from 'date-fns'
import {TableRow} from '../Table-row/TableRow'
import {dayOfMonth, dayOfWeek, toMonths} from '../utils/utils'
import {FirstHeaderCell} from '../Table-cell/FirstHeaderCell'


export function TableHeader({interval, days, ...props}) {
    const shiftLeft = props.shiftDateIntervalLeft
    const shiftRight = props.shiftDateIntervalRight
    const shiftNow = props.shiftDateIntervalNow
    const shiftFrom = props.shiftDateIntervalFrom

    const months = eachMonthOfInterval(interval)

    const headerDaysCells = days.map(day =>
        <TableCell
            topString={dayOfMonth(day)}
            bottomString={dayOfWeek(day)}
            isWeekend={isWeekend(day)}
            isToday={isToday(day)}
            key={day}
        />)

    const monthsCells = months.map(toMonths(interval, months, shiftLeft, shiftRight))

    return (
        <>
            <FirstHeaderCell onClick={shiftNow} shiftFrom={shiftFrom} fromDay={interval.start}/>
            <TableRow rowCells={monthsCells}/>
            <TableRow rowCells={headerDaysCells}/>
        </>
    )
}
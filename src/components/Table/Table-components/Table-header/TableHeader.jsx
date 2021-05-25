import React from "react";
import {TableCell} from "../Table-cell/TableCell";
import {eachMonthOfInterval} from "date-fns";
import {TableRow} from "../Table-row/TableRow";
import {dayOfMonth, dayOfWeek, now, toMonths} from "../../utils/utils";
import {FirstHeaderCell} from '../Table-cell/FirstHeaderCell'


export function TableHeader(props) {
    const days = props.table.days

    const startInterval = days[0]
    const endInterval = days[days.length-1]
    const months = eachMonthOfInterval({start: startInterval, end: endInterval})
    
    const headerDaysCells = days.map(day => <TableCell topString={dayOfMonth(day)} bottomString={dayOfWeek(day)} key={day}/>)
    const monthsCells = months.map(toMonths(days, months))

    return (
        <>
            <FirstHeaderCell now={now} />
            <TableRow rowCells={monthsCells} />
            <TableRow rowCells={headerDaysCells} />
        </>
    )
}
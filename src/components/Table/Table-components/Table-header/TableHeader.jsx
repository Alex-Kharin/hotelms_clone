import React from "react";
import {TableCell} from "../Table-cell/TableCell";
import {
    differenceInCalendarDays,
    eachMonthOfInterval,
    endOfMonth,
    format,
    isAfter,
    startOfMonth,
} from "date-fns";
import {ru} from "date-fns/locale";
import {TableRow} from "../Table-row/TableRow";
import {Button} from "../../../Button/Button";

let dayOfMonth = (day) => format(day, 'dd', {locale: ru})
let dayOfWeek = (day) => format(day, 'eeeeee', {locale: ru})
let monthName = (month) => format(month, 'LLLL', {locale: ru})
let yearOfDate = (date) => format(date, 'y', {locale: ru})

export function TableHeader(props) {
    let days = props.table.days
    let months = eachMonthOfInterval({start: days[0], end: days[days.length-1]})
    let now = format(new Date(), 'dd-MM-y', {locale: ru})
    
    let headerDaysCells = days.map(day => <TableCell dayOfMonth={dayOfMonth(day)} dayOfWeek={dayOfWeek(day)} key={day}/>)
    let monthsCells = months.map(month => {
        let start = isAfter(days[0], startOfMonth(month)) ? days[0] : startOfMonth(month)
        let end = isAfter(endOfMonth(month), days[days.length - 1]) ? days[days.length - 1] : endOfMonth(month)
        let daysInCurrentMonth = differenceInCalendarDays(end, start) + 1
        let leftBtn = month === months[0] ? <Button iconName={'keyboard_arrow_left'} /> : null
        let rightBtn = month === months[months.length-1] ? <Button iconName={'keyboard_arrow_right'} /> : null
        return <div style={{gridColumn: `span ${daysInCurrentMonth}`, border: "1px solid black", display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 5px'}}>
            {leftBtn} <strong style={{margin: 'auto 45px'}}>{monthName(month)} {yearOfDate(month)}</strong> {rightBtn}
        </div>
    })
    return (
        <>
            <div style={{gridRow: "1/3", border: "1px solid black", display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <span style={{border: "1px solid black", borderLeft: "5px solid red", padding: "5px", borderRadius: "5px"}}>{now}</span>
                    <Button iconName={"schedule"}/>
                </div>
                <div style={{textAlign: "center"}}>
                    Номера
                </div>
            
            </div>
            <TableRow rowCells={monthsCells} />
            <TableRow rowCells={headerDaysCells} />
        </>
    )
}
import React from "react";
import {
    addDays,
    differenceInCalendarDays,
    eachDayOfInterval,
    eachMonthOfInterval,
    endOfMonth,
    format,
    isAfter, startOfMonth
} from "date-fns";
import style from './Table.module.css'
import {ru} from "date-fns/locale";


let from = new Date()
let daysInTable = 50
let to = addDays(from, daysInTable)
let days = eachDayOfInterval({start: from, end: to})
let dateOfMonth = (day) => format(day, 'dd', {locale: ru})
let dayOfWeek = (day) => format(day, 'eeeeee', {locale: ru})
let monthName = (month) => format(month, 'LLLL', {locale: ru})
let yearOfDate = (date) => format(date, 'y', {locale: ru})
let months = eachMonthOfInterval({start: from, end: to})


function MonthHeader(props) {
    return (
        <div className={style['month-header']}>
            <strong>{props.month} 2021</strong>
        </div>
    )
}

// function Cell(props) {
//     return (
//         <div className={style.cell} data-date={props.date}>
//             <span>{props.dateOfMonth}</span>
//             <br/>
//             <span>{props.dayOfWeek}</span>
//         </div>
//     )
// }

// function Row(props) {
//     return (
//         <>
//             <div style={{border: "1px solid blue"}}>{props.appartmentsNumber}</div>
//             {props.daysRow}
//         </>
//
//     )
// }

// let daysRow = days.map(day => <Cell dateOfMonth={dateOfMonth(day)} dayOfWeek={dayOfWeek(day)}/>)
// let daysRow2 = days.map(day => <Cell dateOfMonth={dateOfMonth(day)} date={day}/>)
// let monthsCells = months.map(month => {
//     let start = isAfter(days[0], startOfMonth(month)) ? days[0] : startOfMonth(month)
//     let end = isAfter(endOfMonth(month), days[days.length - 1]) ? days[days.length - 1] : endOfMonth(month)
//     let daysInCurrentMonth = differenceInCalendarDays(end, start) + 1
//     return <div style={{gridColumn: `span ${daysInCurrentMonth}`, border: "1px solid red"}}>
//         <strong>{monthName(month)} {yearOfDate(month)}</strong>
//     </div>
// })

export function Table(props) {
    
    return (
        <div className={style.tableWrapper}>
            <Row appartmentsNumber={'Date'} daysRow={monthsCells}/>
            <Row appartmentsNumber={'Apartments'} daysRow={daysRow}/>
            <Row appartmentsNumber={555} daysRow={daysRow2}/>
        </div>
    )
}
import {differenceInCalendarDays, endOfMonth, format, isAfter, startOfMonth} from "date-fns";
import {ru} from "date-fns/locale";
import {Button} from "../../Button/Button";
import React from "react";
import {MonthCell} from '../Table-components/Table-cell/MonthCell'


const dayOfMonth = (day) => format(day, 'dd', {locale: ru})
const dayOfWeek = (day) => format(day, 'eeeeee', {locale: ru})
const monthName = (month) => format(month, 'LLLL', {locale: ru})
const yearOfDate = (date) => format(date, 'y', {locale: ru})
const now = format(new Date(), 'dd-MM-y', {locale: ru})

function toMonths(days, months) {
    return function (month) {
        const startInterval = days[0]
        const endInterval = days[days.length - 1]
        
        const start = isAfter(startInterval, startOfMonth(month)) ? startInterval : startOfMonth(month)
        const end = isAfter(endOfMonth(month), endInterval) ? endInterval : endOfMonth(month)
    
        const daysInCurrentMonth = differenceInCalendarDays(end, start) + 1
        
        const firstMonth = months[0]
        const lastMonth = months[months.length - 1]
    
        const leftBtn = month === firstMonth ? <Button iconName={'keyboard_arrow_left'}/> : null
        const rightBtn = month === lastMonth ? <Button iconName={'keyboard_arrow_right'}/> : null
    
        return <MonthCell daysInCurrentMonth={daysInCurrentMonth}
                          leftBtn={leftBtn}
                          rightBtn={rightBtn}
                          monthName={monthName(month)}
                          yearOfDate={yearOfDate(month)}
        />
    }
}

export {dayOfMonth, dayOfWeek, monthName, yearOfDate, now, toMonths}
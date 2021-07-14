import {differenceInCalendarDays, endOfMonth, format, isAfter, isBefore, isWithinInterval, startOfMonth} from 'date-fns'
import {ru} from 'date-fns/locale'
import {Button} from '../../Button/Button'
import React from 'react'
import {MonthCell} from '../Table-components/Table-cell/MonthCell'


const dayOfMonth = (day) => format(day, 'dd', {locale: ru})
const dayOfWeek = (day) => format(day, 'eeeeee', {locale: ru})
const monthName = (month) => format(month, 'LLLL', {locale: ru})
const yearOfDate = (date) => format(date, 'y', {locale: ru})
const now = format(new Date(), 'dd-MM-y', {locale: ru})

function toMonths(interval, months, shiftLeft, shiftRight) {
    return function (month) {
        const start = isAfter(interval.start, startOfMonth(month)) ? interval.start : startOfMonth(month)
        const end = isAfter(endOfMonth(month), interval.end) ? interval.end : endOfMonth(month)

        const daysInCurrentMonth = differenceInCalendarDays(end, start) + 1

        const firstMonth = months[0]
        const lastMonth = months[months.length - 1]
        let position = ''

        const leftBtn = month === firstMonth ? (position = 'flex-start', <Button iconName={'keyboard_arrow_left'}
                                                                                 onClick={shiftLeft} isFlex/>) : null
        const rightBtn = month === lastMonth ? (position = 'flex-end', <Button iconName={'keyboard_arrow_right'}
                                                                               onClick={shiftRight} isFlex/>) : null

        return <MonthCell daysInCurrentMonth={daysInCurrentMonth}
                          leftBtn={leftBtn}
                          rightBtn={rightBtn}
                          monthName={monthName(month)}
                          yearOfDate={yearOfDate(month)}
                          position={position}
                          key={month}
        />
    }
}

function adjustsInterval(interval) {
    return isBefore(interval.end, interval.start)
        ? {start: interval.end, end: interval.start}
        : interval
}

function isSelectInterval(interval, day, apartmentIdForSelect, currentId) {
    return interval.start
        ? isWithinInterval(day, interval) && apartmentIdForSelect === currentId
        : false
}

function shifterViewedRentIntervals(state, action, rangeBorder, shiftFunction) {
    let day = state.viewRentIntervals[action.apartmentId][action.index][rangeBorder]
    day = shiftFunction(day, 1)

    state = {...state}
    state.viewRentIntervals = {...state.viewRentIntervals}
    state.viewRentIntervals[action.apartmentId] = [...state.viewRentIntervals[action.apartmentId]]
    state.viewRentIntervals[action.apartmentId][action.index] = {
        ...state.viewRentIntervals[action.apartmentId][action.index],
        [rangeBorder]: day
    }
    return state
}

export {
    dayOfMonth,
    dayOfWeek,
    monthName,
    yearOfDate,
    now,
    toMonths,
    adjustsInterval,
    isSelectInterval,
    shifterViewedRentIntervals
}
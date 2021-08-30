import {
    differenceInCalendarDays,
    endOfMonth,
    format,
    isAfter,
    isSameDay,
    isWithinInterval,
    set,
    startOfDay,
    startOfMonth,
} from 'date-fns'
import {ru, enGB} from 'date-fns/locale'
import {Button} from '../components/simpleElements/Button'
import React from 'react'
import {MonthCell} from '../components/Table/Table-cell/MonthCell'
import {borderWidth} from '../settings/settings'

const locale = enGB
const dayOfMonth = (day) => format(day, 'dd', {locale})
const dayOfWeek = (day) => format(day, 'eeeeee', {locale})
const monthName = (month) => format(month, 'LLLL', {locale})
const yearOfDate = (date) => format(date, 'y', {locale})
const dateToString = (date) => format(date, 'dd-MM-y', {locale})
const getTime = (date) => format(date, 'HH:mm', {locale})
const isDayBefore = (day1, day2) => startOfDay(day1) < startOfDay(day2)
const intervalLength = (interval) => differenceInCalendarDays(interval.end, interval.start)
const setTimeToDate = (date, time) => {
    const [hours, minutes] = time.split(':')
    return set(date, {hours, minutes})
}
const isIntervalIncludedInAnother = (outerInterval, innerInterval) => {
    return outerInterval.start < innerInterval.start && outerInterval.end > innerInterval.end
}

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
    return isDayBefore(interval.end, interval.start)
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

function isDayStartRentalInterval(array, day) {
    for (let i = 0; i < array?.length; i++) {
        if (isSameDay(day, array[i].start) && !isSameDay(array[i].start, array[i].end)) {
            return [array[i], i]
        }
    }
    return false
}

function isArrow(viewRentIntervals, apartmentsByType, id, index, rangeInterval) {
    return rangeInterval === 'start'
        ? viewRentIntervals[id] && isDayBefore(apartmentsByType[id]?.rentInfo[index]?.rentInterval.start, viewRentIntervals[id][index]?.start)
        : viewRentIntervals[id] && isDayBefore(viewRentIntervals[id][index]?.end, apartmentsByType[id]?.rentInfo[index]?.rentInterval.end)
}

// = width*duration + 2*duration*borderWidth
function widthRentElement(cellDimensions, viewRentInterval) {
    return cellDimensions.width * intervalLength(viewRentInterval) +
        intervalLength(viewRentInterval) * 2 * borderWidth + 'px'
}

function checkAndReturnNewViewRentInterval(rentInfoInterval, interval) {
    let visibleInterval = null
    if (isSameDay(rentInfoInterval.start, interval.end)) {
        return {start: rentInfoInterval.start, end: rentInfoInterval.start}
    }
    if (isSameDay(rentInfoInterval.end, interval.start)) {
        return {start: rentInfoInterval.end, end: rentInfoInterval.end}
    }
    if (
        isWithinInterval(rentInfoInterval.end, interval)
        && (isSameDay(rentInfoInterval.start, interval.start)
            || isDayBefore(rentInfoInterval.start, interval.start))
    ) {
        visibleInterval = {...rentInfoInterval, start: interval.start}
    }
    if (
        isWithinInterval(rentInfoInterval.start, interval)
        && (isSameDay(rentInfoInterval.end, interval.end)
            || isDayBefore(interval.end, rentInfoInterval.end))
    ) {
        visibleInterval = {...rentInfoInterval, end: interval.end}
    }
    if (isIntervalIncludedInAnother(rentInfoInterval, interval)) {
        visibleInterval = {...interval}
    }
    return visibleInterval || rentInfoInterval
}

function CreateViewRentIntervals(rentInfos, interval) {
    return rentInfos.reduce((acc, rentInfo) => {
        const newViewRentInterval = checkAndReturnNewViewRentInterval(rentInfo.rentInterval, interval)
        acc[rentInfo.apartmentId] = [...acc[rentInfo.apartmentId] || [], newViewRentInterval ]
        return acc
    }, {})
}

function collectObjects(apartmentsArray, rentInfos) {
    return apartmentsArray.map(apartment => {
        apartment.rentInfo = rentInfos.filter(rentInfo => rentInfo.apartmentId === apartment.id)
        return apartment
    })
}

function createApartments(collectionObjects) {
    return collectionObjects.reduce((acc, apartment) => {
        if (acc[apartment.apartmentsType]) {
            acc[apartment.apartmentsType][apartment.id] = {...acc[apartment.apartmentsType][apartment.id], ...apartment}
        } else {
            acc[apartment.apartmentsType] = {}
            acc[apartment.apartmentsType][apartment.id] = apartment
        }
        return acc
    }, {})
}

export {
    dayOfMonth, dayOfWeek, monthName, yearOfDate, dateToString, toMonths, adjustsInterval, isSelectInterval,
    shifterViewedRentIntervals, isDayStartRentalInterval, isArrow, widthRentElement, getTime, setTimeToDate,
    isDayBefore, intervalLength, CreateViewRentIntervals, collectObjects, createApartments,
    checkAndReturnNewViewRentInterval,
}
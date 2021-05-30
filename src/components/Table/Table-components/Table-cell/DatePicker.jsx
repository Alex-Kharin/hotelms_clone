import React from 'react';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import {ru} from 'date-fns/locale'

const WEEKDAYS_SHORT = {
    ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
}

const MONTHS = {
    ru: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ],
}

const WEEKDAYS_LONG = {
    ru: [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ],
}

const FIRST_DAY_OF_WEEK = {
    ru: 1,
}

const LABELS = {
    ru: { nextMonth: 'следующий месяц', previousMonth: 'предыдущий месяц' },
}


function parseDate(str, format, locale) {
    const parsed = dateFnsParse(str, format, new Date(), { locale });
    if (DateUtils.isDate(parsed)) {
        return parsed;
    }
    return undefined;
}

function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
}

export default function DatePicker(props) {
    const FORMAT = 'dd-MM-yyyy';
    const locale = 'ru'
    return (
        <DayPickerInput
            dayPickerProps={{
                todayButton: 'Сегодня',
                locale: ru,
                months: MONTHS[locale],
                weekdaysLong: WEEKDAYS_LONG[locale],
                weekdaysShort: WEEKDAYS_SHORT[locale],
                firstDayOfWeek: FIRST_DAY_OF_WEEK[locale],
                labels: LABELS[locale],
            }}
            formatDate={formatDate}
            format={FORMAT}
            parseDate={parseDate}
            placeholder={`${dateFnsFormat(props.fromDay, FORMAT)}`}
            selectedDay={props.fromDay}
            value={props.fromDay}
            keepFocus={false}
            onDayChange={day => props.shiftFrom(day)}
        />
    );
}
import {Field, Form, Formik} from 'formik'
import React from 'react'
import {Button} from '../Button/Button'
import './style.css'

export const TableSettingsForm = (props) => {
    const min = 29
    const max = 366

    return (
        <Formik
            initialValues={{daysInTable: props.daysInTable}}
            onSubmit={(values) => {
                props.changeDaysInTable(values.daysInTable)
            }}
        >
            {({setFieldValue}) =>
            <Form>
                <label htmlFor="daysInTable">Дней в сетке: </label>
                <Field name="daysInTable" type="number" min={min} max={max} title={`мин: ${min}; макс: ${max}`} />
                <Button type="button"  onClick={() => setFieldValue('daysInTable', min)} size={'0.8em'}>reset</Button>
                <hr />
                <Button type="submit" size={'0.8em'}>Сохранить</Button>
                <Button type="button" onClick={props.closeModal} size={'0.8em'}> Закрыть </Button>
            </Form>}
        </ Formik>
    )
}
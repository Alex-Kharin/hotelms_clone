import {Field, Form, Formik} from 'formik'
import React from 'react'
import {Button} from '../simpleElements/Button'
import {SaveCloseButtons} from './SaveCloseButtons'

export const TableSettingsForm = (props) => {
    const{daysInTable, changeDaysInTable, closeModal, } = props

    const min = 29
    const max = 366

    return (
        <Formik
            initialValues={{daysInTable: daysInTable}}
            onSubmit={(values) => {
                changeDaysInTable(values.daysInTable)
            }}
        >
            {({setFieldValue}) =>
            <Form>
                <label htmlFor="daysInTable">Дней в сетке: </label>
                <Field name="daysInTable" type="number" min={min} max={max} title={`мин: ${min}; макс: ${max}`} />
                <Button type="button"  onClick={() => setFieldValue('daysInTable', min)} size={'0.8em'}>Сбросить</Button>
                <hr />
                <SaveCloseButtons closeHandler={closeModal}/>
            </Form>}
        </ Formik>
    )
}
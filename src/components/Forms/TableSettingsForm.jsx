import {Field, Form, Formik} from 'formik'
import React from 'react'
import {Button} from '../simpleElements/Button'
import {SaveCloseButtons} from './SaveCloseButtons'
import {Fieldset, Legend} from '../simpleElements/StyledElements'

export const TableSettingsForm = (props) => {
    const{daysInTable, changeDaysInTable, } = props

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
                <Fieldset>
                    <Legend><strong>Days in grid</strong></Legend>
                    <Field name="daysInTable" type="number" min={min} max={max} title={`мин: ${min}; макс: ${max}`}/>
                    <Button type="button"
                            size={'0.8em'}
                            onClick={() => setFieldValue('daysInTable', min)}
                    >
                        Reset
                    </Button>
                </Fieldset>
                <SaveCloseButtons />
            </Form>}
        </ Formik>
    )
}
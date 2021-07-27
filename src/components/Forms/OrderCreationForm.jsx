import {ErrorMessage, Field, Form, Formik} from 'formik'
import {SaveCloseButtons} from './SaveCloseButtons'
import React from 'react'


export function OrderCreationForm(props) {
    const {closeModal, } = props

    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '' }}
        >
            <Form>
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" type="text" />
                <ErrorMessage name="firstName" />

                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" type="text" />
                <ErrorMessage name="lastName" />

                <label htmlFor="email">Email Address</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" />

                <hr />
                <SaveCloseButtons closeHandler={closeModal}/>
            </Form>


        </Formik>
    )
}
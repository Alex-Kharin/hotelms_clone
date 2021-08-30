import {Field, Form, Formik} from 'formik'
import React, {Fragment} from 'react'
import {SaveCloseButtons} from './SaveCloseButtons'
import * as settings from '../../settings/settings'
import styled from 'styled-components'


const SettingsExample = styled.div`
  display: inline-block;
  width: 2em;
  height: 2em;
  background-color: ${props => props.background};
  border: ${settings.border};
  vertical-align: middle;
`

export const CommonSettingsForm = () => {
    return (
        <Formik
            initialValues={settings}
        >
            <Form>
                <h3>
                    One fine day, the settings can still be changed through this form,
                    but now they can be found in: 'src/settings/settings.js'
                </h3>
                {Object.keys(settings).map(item => {
                    return (
                        typeof settings[item] !== 'function' && <Fragment key={item}>
                            <label htmlFor={item}>{item}</label>
                            <Field name={item} type="text" readOnly/>
                            {item.includes('Color') && <SettingsExample  background={settings[item]}/> }
                            <br/>
                        </Fragment>
                    )
                })}

                <SaveCloseButtons notSave/>
            </Form>
        </ Formik>
    )
}
import * as React from 'react'
import {ErrorMessage, Field, Form, Formik, useFormikContext} from 'formik'
import {ErrorMessageElement, Fieldset, Legend} from '../simpleElements/StyledElements'
import {Button} from '../simpleElements/Button'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {login} from '../../store/authReducer'
import {getIsAuth} from '../../store/headerContainerSelector'
import * as Yup from 'yup'



const LoginWrapper = styled.div`
  width: 30%;
  margin: 0 auto;
`

const StyledFieldset = styled(Fieldset)`
  display: flex;
  flex-direction: column;
`

export function Login(props) {
    return (
        <LoginWrapper>
            <Formik
                initialValues={{login: '', password: ''}}
                validationSchema={Yup.object().shape({
                    login: Yup.string()
                        .min(2, 'Too Short!')
                        .max(20, 'Too Long!')
                        .required('Required'),
                    password: Yup.string()
                        .required("No password provided.")
                })}
                onSubmit={(values, actions) => {
                    props.login(values, actions)
                }}
            >
                <Form>
                    <StyledFieldset>
                        <Legend><strong>Auth</strong></Legend>

                        <Field name="login" type="text" placeholder="Login" autoFocus={true} />
                        <ErrorMessage component={ErrorMessageElement} name="login"/>

                        <Field name="password" type="password" placeholder="Password"/>
                        <ErrorMessage component={ErrorMessageElement} name="password"/>

                        <StatusField />
                        <br/>
                        <Submit />
                    </StyledFieldset>
                    <p>Login: <strong>user</strong></p>
                    <p>Password: <strong>user</strong></p>
                </Form>

            </Formik>
        </LoginWrapper>
    )
}

function StatusField() {
    const {errors} = useFormikContext()
    return <ErrorMessageElement>{errors?.api}</ErrorMessageElement>
}

function Submit() {
    const {errors, touched, isValid} = useFormikContext()
    const isDisable = errors.api || !isValid || !touched.password || !touched.login
    return <Button type="submit" isDisable={isDisable}>Sign-in</Button>
}

function mapStateToProps(state) {
    return {
        isAuth: getIsAuth(state)
    }
}

export default connect(mapStateToProps, {login})(Login)
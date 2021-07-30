import {ErrorMessage, Field, Form, Formik, useField, useFormikContext} from 'formik'
import {SaveCloseButtons} from './SaveCloseButtons'
import React, {useEffect} from 'react'
import {dateToString} from '../Table/utils/utils'
import {intervalToDuration} from 'date-fns'
import {Icon} from '../simpleElements/Icon'
import {reversObjectProp} from '../../commonUtils/commonUtils'
import {maxAdditionalPersons, priceAdditionalPerson} from '../../settings/settings'
import styled from 'styled-components'

function AddsSum(props){
    const {fieldName} = props
    let {values:{[fieldName]: field}, } = useFormikContext()
    const personsAddsSum = field * priceAdditionalPerson || false
    return (
        <>
            {personsAddsSum && <span>+{personsAddsSum}</span>}
        </>
    )
}

function getPrice(days, tariff=0, percentageDiscount, moneyDiscount, additionalPersons) {
    let price
    percentageDiscount = Number(percentageDiscount) || 0
    moneyDiscount = Number(moneyDiscount) || 0
    additionalPersons=Number(additionalPersons) || 0
    tariff=Number(tariff) || 0
    const personsAddsSum = additionalPersons * priceAdditionalPerson

    const basePrice = days * tariff + personsAddsSum
    price = basePrice
    if (percentageDiscount) {
        price = basePrice * (1 - percentageDiscount/100)
    } else if (moneyDiscount && !percentageDiscount) {
        price = basePrice - moneyDiscount
    }
    return Number(price.toFixed(2))
}

function PriceField(propsAll) {
    const {calcFunction, ...props} = propsAll
    let {values:{tariff, percentageDiscount, moneyDiscount, additionalPersons, price}, setFieldValue, touched, ...cont} = useFormikContext()
    const [field, meta] = useField(props.name)
    // tariff = Number(tariff) || 0
    // percentageDiscount = Number(percentageDiscount) || 0
    // console.log(field, meta)
    // console.log(cont)
    useEffect(() => {
        if ( tariff ) {
            console.log(percentageDiscount,typeof percentageDiscount, moneyDiscount, typeof moneyDiscount)
            setFieldValue(props.name, `${calcFunction(tariff, percentageDiscount, moneyDiscount, additionalPersons)}`);
        }
        if (percentageDiscount) {
            setFieldValue('moneyDiscount', `${(price*percentageDiscount/100).toFixed(2)}`)
        }

    }, [tariff, percentageDiscount, moneyDiscount, additionalPersons, props.name, price]);

    return (
        <>
            <input {...props} {...field} />
            {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
        </>
    )
}

export function OrderCreationForm(props) {
    const {closeModal, rentInfo, setRentInfo, index, apartmentsType, apartmentId, tariffs, numberOfPersons} = props
    const {
        rentInterval,
        personInfo:{firstName='Аноним', lastName='', email='', phone=''}={},
        additionalPersons = 0,
        persons = 1,
        tariff = '',
        percentageDiscount = 0,
        moneyDiscount = 0,
        // price = 0,
    } = rentInfo

    let sum = getPrice(intervalToDuration(rentInterval).days, tariffs[tariff] || tariffs[apartmentsType], percentageDiscount, moneyDiscount, additionalPersons)
    let calcFunc = (tariff, percentageDiscount, moneyDiscount, additionalPersons) => getPrice(intervalToDuration(rentInterval).days, tariff, percentageDiscount, moneyDiscount, additionalPersons)

    return (
        <Formik
            initialValues={{
                firstName, lastName, email, phone, additionalPersons, percentageDiscount, moneyDiscount, persons,
                tariff: tariffs[tariff] || tariffs[apartmentsType],
                price: sum,
                checkIn: dateToString(rentInterval.start),
                nights: intervalToDuration(rentInterval).days,
                checkOut: dateToString(rentInterval.end)
            }}

            onSubmit={(values) => {
                const newRentInfo ={
                    rentInterval,
                    personInfo:{
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        phone: values.phone
                    },
                    additionalPersons: values.additionalPersons,
                    persons: values.persons,
                    tariff: reversObjectProp(tariffs)[values.tariff],
                    percentageDiscount: Number(values.percentageDiscount),
                    moneyDiscount: values.moneyDiscount,
                    price: values.price,
                }
                console.log(values)
                setRentInfo(apartmentsType, index, apartmentId, newRentInfo)
            }}

        >
            <Form>
                <label htmlFor="firstName">Имя</label>
                <Field name="firstName" type="text" autoFocus={true}/>
                <ErrorMessage name="firstName" />

                <label htmlFor="lastName">Отчество</label>
                <Field name="lastName" type="text" />
                <ErrorMessage name="lastName" />
                <br/>
                <label htmlFor="email">E-mail</label>
                <Field name="email" type="email" />
                <ErrorMessage name="email" />

                <label htmlFor="phone">Телефон</label>
                <Field name="phone" type="text" />
                <ErrorMessage name="phone" />

                <hr />

                <label htmlFor="checkIn">Заезд</label>
                <Field name="checkIn" type="text" readOnly/>
                <ErrorMessage name="checkIn" />

                <label htmlFor="nights">Ночей</label>
                <Field name="nights" type="text" readOnly/>
                <ErrorMessage name="nights" />

                <label htmlFor="checkOut">Выезд</label>
                <Field name="checkOut" type="text" readOnly/>
                <ErrorMessage name="checkOut" />

                <hr />

                <label htmlFor="persons" title={`от 1 до ${numberOfPersons}`}>
                    <Icon>group</Icon>
                </label>
                <Field name="persons" type="number" min={1} max={numberOfPersons} title={`от 1 до ${numberOfPersons}`}/>
                <ErrorMessage name="persons" />

                <label htmlFor="additionalPersons">
                    <Icon>group_add</Icon>
                </label>
                <Field name="additionalPersons" as="select">
                    {[...Array(maxAdditionalPersons).keys()].map(num => <option value={num} key={num}>{num}</option> )}
                </Field>
                <ErrorMessage name="additionalPersons" />
                <AddsSum fieldName={'additionalPersons'}/>

                <hr />

                <label htmlFor="tariff">Тариф</label>
                <Field name="tariff" as="select">
                    {Object.keys(tariffs).map(tariff => <option value={tariffs[tariff]} key={tariff}>{tariff}</option>)}
                </Field>
                <ErrorMessage name="tariff" />

                <label htmlFor="percentageDiscount">Скидка %</label>
                <Field name="percentageDiscount" type="number" min={0} max={100}/>
                <ErrorMessage name="percentageDiscount" />

                <label htmlFor="moneyDiscount">Скидка</label>
                <Field name="moneyDiscount" type="text"/>
                <ErrorMessage name="moneyDiscount" />

                <hr />

                <label htmlFor="price">Сумма</label>
                {/*<Field name="price" type="text" readOnly/>*/}
                <PriceField name="price" type="text" readOnly calcFunction={calcFunc}/>
                <ErrorMessage name="price" />

                <SaveCloseButtons closeHandler={closeModal}/>
            </Form>


        </Formik>
    )
}
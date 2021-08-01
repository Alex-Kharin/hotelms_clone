import {ErrorMessage, Field, Form, Formik, useField, useFormikContext} from 'formik'
import {SaveCloseButtons} from './SaveCloseButtons'
import React, {useEffect} from 'react'
import {dateToString, getTime, setTimeToDate} from '../Table/utils/utils'
import {intervalToDuration} from 'date-fns'
import {Icon} from '../simpleElements/Icon'
import {reversObjectProp} from '../../commonUtils/commonUtils'
import {currentCurrency, maxAdditionalPersons, priceAdditionalPerson} from '../../settings/settings'
import styled from 'styled-components'


const LikeFormField = styled.span`
  border-radius: 3px;
  border: 1px solid lightgrey;
  border-left: cornflowerblue 5px solid;
  background-color: white;
  font-size: 1.1em;
  margin: 1em;
  text-align: center;
  padding: 0.2em 0.5em;
`

function InfoFormField(props){
    const {fieldName, isAdditionalPersons} = props
    let {values:{[fieldName]: field}, } = useFormikContext()
    const personsAddsSum = field * priceAdditionalPerson || false
    return (
        <>
            {isAdditionalPersons && personsAddsSum && <>=<LikeFormField>{personsAddsSum} {currentCurrency}</LikeFormField></>}
            {!isAdditionalPersons && <>=<LikeFormField>{field} {currentCurrency}</LikeFormField></>}
        </>
    )
}

function getPrice(days, tariff=0, additionalPersons) {
    additionalPersons=Number(additionalPersons) || 0
    tariff=Number(tariff) || 0
    const price = days * tariff + additionalPersons * priceAdditionalPerson

    return Number(price.toFixed(2))
}

function PriceField(propsAll) {
    const {calcFunction, ...props} = propsAll
    const {
        values:{
            tariff,
            percentageDiscount,
            moneyDiscount,
            additionalPersons,
        },
        setFieldValue,
    } = useFormikContext()
    const [field, meta] = useField(props.name)

    useEffect(() => {
        const price = calcFunction(tariff, additionalPersons)
        const moneyDiscountCalc = Number((price * percentageDiscount/100).toFixed(2)) || Number(moneyDiscount)

        setFieldValue(props.name, `${price-moneyDiscountCalc} ${currentCurrency}`)
        setFieldValue('moneyDiscount', `${moneyDiscountCalc}`)

    }, [tariff, percentageDiscount, additionalPersons, moneyDiscount]);

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
        price = 0,
    } = rentInfo

    let calculatedPrice = getPrice(intervalToDuration(rentInterval).days, tariffs[tariff] || tariffs[apartmentsType], additionalPersons) - moneyDiscount
    let calcFunc = (tariff, additionalPersons) => getPrice(intervalToDuration(rentInterval).days, tariff, additionalPersons)

    return (
        <Formik
            initialValues={{
                firstName, lastName, email, phone, additionalPersons, percentageDiscount, moneyDiscount, persons,
                checkInTime: getTime(rentInterval.start),
                checkOutTime: getTime(rentInterval.end),
                tariff: tariffs[tariff] || tariffs[apartmentsType],
                price: price || calculatedPrice,
                checkIn: dateToString(rentInterval.start),
                nights: intervalToDuration(rentInterval).days,
                checkOut: dateToString(rentInterval.end)
            }}

            onSubmit={(values) => {
                const newRentInfo ={
                    rentInterval: {start: setTimeToDate(rentInterval.start, values.checkInTime), end: setTimeToDate(rentInterval.end, values.checkOutTime)},
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

                <label htmlFor="checkInTime" />
                <Field name="checkInTime" type="time" />
                <ErrorMessage name="checkInTime" />

                <label htmlFor="nights">Ночей</label>
                <Field name="nights" type="text" size="4" readOnly/>
                <ErrorMessage name="nights" />

                <label htmlFor="checkOut">Выезд</label>
                <Field name="checkOut" type="text" readOnly/>
                <ErrorMessage name="checkOut" />

                <label htmlFor="checkOutTime"/>
                <Field name="checkOutTime" type="time" />
                <ErrorMessage name="checkOutTime" />

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
                <InfoFormField fieldName={'additionalPersons'} isAdditionalPersons/>

                <hr />

                <label htmlFor="tariff">Тариф</label>
                <Field name="tariff" as="select">
                    {Object.keys(tariffs).map(tariff => <option value={tariffs[tariff]} key={tariff}>{tariff}</option>)}
                </Field>
                <ErrorMessage name="tariff" />
                <InfoFormField fieldName={'tariff'} />

                <label htmlFor="percentageDiscount">Скидка %</label>
                <Field name="percentageDiscount" type="number" min={0} max={100}/>
                <ErrorMessage name="percentageDiscount" />

                <label htmlFor="moneyDiscount">Скидка</label>
                <Field name="moneyDiscount" type="text"/>
                <span>{currentCurrency}</span>
                <ErrorMessage name="moneyDiscount" />

                <hr />

                <label htmlFor="price">Сумма</label>
                <PriceField name="price" type="text" readOnly calcFunction={calcFunc} />
                <ErrorMessage name="price" />

                <SaveCloseButtons closeHandler={closeModal}/>
            </Form>


        </Formik>
    )
}
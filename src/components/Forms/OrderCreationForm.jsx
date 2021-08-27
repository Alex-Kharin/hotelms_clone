import {ErrorMessage, Field, Form, Formik, useField, useFormikContext} from 'formik'
import {SaveCloseButtons} from './SaveCloseButtons'
import React, {useEffect} from 'react'
import {dateToString, getTime, intervalLength, setTimeToDate} from '../Table/utils/utils'
import {Icon} from '../simpleElements/Icon'
import {reversObjectProp} from '../../commonUtils/commonUtils'
import {currentCurrency, gridAutoRowsHeight, maxAdditionalPersons, priceAdditionalPerson} from '../../settings/settings'
import styled from 'styled-components'
import {Button} from '../simpleElements/Button'
import * as Yup from 'yup'


const LikeFormField = styled.span`
  border-radius: 3px;
  border: 1px solid lightgrey;
  border-left: #43b25a 5px solid;
  background-color: white;
  font-size: 1.1em;
  margin: 1em;
  text-align: center;
  padding: 0.2em 0.5em;
`

const ErrorMessageElement = styled.div`
color: red;
`

const TitleWrapper = styled.div`
  height: ${gridAutoRowsHeight}px;
  text-align: center;
  font-weight: bold;
  font-size: 1.2em;
`

const Delete = styled.div`
  float: right;

  &:hover{
    ::before{
      content: "${props => props.message}";
      color: red;
      font-weight: bold;
    }
  }
`

export function OrderCreationForm(props) {
    const {
        closeModal, rentInfo, setRentInfo, index, apartmentsType, apartmentId, tariffs, numberOfPersons, cancelRent,
    } = props
    const {
        id=null,
        rentInterval,
        personInfo:{firstName='Аноним', lastName='', email='', phone=''}={},
        additionalPersons = 0,
        persons = 1,
        tariff = '',
        percentageDiscount = 0,
        moneyDiscount = 0,
        price = 0,
        comment='',
    } = rentInfo

    const tariffPrice = tariffs[tariff] || tariffs[`${apartmentsType}_${numberOfPersons}`]
    const phoneRegExp = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/

    return (
        <Formik
            initialValues={{
                firstName, lastName, email, phone, additionalPersons, percentageDiscount, moneyDiscount, persons,
                comment, price,
                checkInTime: getTime(rentInterval.start),
                checkOutTime: getTime(rentInterval.end),
                tariff: tariffPrice,
                checkIn: dateToString(rentInterval.start),
                nights: intervalLength(rentInterval),
                checkOut: dateToString(rentInterval.end)
            }}

            validationSchema={Yup.object({
                firstName: Yup.string()
                    .max(15, 'Имя доложно содержать не более 15 символов')
                    .required('Имя доложно быть обязательно'),
                lastName: Yup.string()
                    .max(20, 'Фамилия должна содержать не более 20 символов')
                    .required('Фамилия должна быть обязательно'),
                email: Yup.string().email('E-mail не валиден').required('E-mail обязателен'),
                phone: Yup.string().matches(phoneRegExp, 'Номер не валиден'),
                price: Yup.string().test('', 'Сумма доложа быть положительной', value => parseFloat(value) >= 0),
            })}

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
                    percentageDiscount: values.percentageDiscount,
                    moneyDiscount: values.moneyDiscount,
                    price: values.price,
                    comment: values.comment,
                    id: id || Math.round(Math.random()*100000000), // just for test. It's must deleted when finished transport layer. It's property created on server side. TODO: delete this!!!
                }
                setRentInfo(apartmentsType, index, apartmentId, newRentInfo)
            }}
        >
            <Form>
                <TitleWrapper>
                    Создание Заказа
                    <Delete message='Удалить сразу и навсегда! Бесповоротно! БЕЗ ДОПОЛНИТЕЛЬНЫХ ПРЕДУПРЕЖДЕНИЙ!!!'>
                        <Button iconName={"delete"} background={"red"} type={"button"} onClick={()=>cancelRent(apartmentsType, index, apartmentId)} />
                    </Delete>
                </TitleWrapper>

                <label htmlFor="firstName">Имя</label>
                <Field name="firstName" type="text" autoFocus={true} />

                <label htmlFor="lastName">Фамилия</label>
                <Field name="lastName" type="text" />
                <ErrorMessage component={ErrorMessageElement} name="firstName" />
                <ErrorMessage component={ErrorMessageElement} name="lastName" />
                <br/>
                <label htmlFor="email">E-mail</label>
                <Field name="email" type="email" />

                <label htmlFor="phone">Телефон</label>
                <Field name="phone" type="text" />
                <ErrorMessage component={ErrorMessageElement} name="email" />
                <ErrorMessage component={ErrorMessageElement} name="phone" />

                <hr />

                <label htmlFor="checkIn">Заезд</label>
                <Field name="checkIn" type="text" readOnly/>

                <label htmlFor="checkInTime" />
                <Field name="checkInTime" type="time" />

                <label htmlFor="nights">Ночей</label>
                <Field name="nights" type="text" size="4" readOnly/>

                <label htmlFor="checkOut">Выезд</label>
                <Field name="checkOut" type="text" readOnly/>

                <label htmlFor="checkOutTime"/>
                <Field name="checkOutTime" type="time" />

                <hr />

                <label htmlFor="persons" title={`от 1 до ${numberOfPersons}`}>
                    <Icon>group</Icon>
                </label>
                <Field name="persons" type="number" min={1} max={numberOfPersons} title={`от 1 до ${numberOfPersons}`}/>

                <label htmlFor="additionalPersons">
                    <Icon>group_add</Icon>
                </label>
                <Field name="additionalPersons" as="select">
                    {[...Array(maxAdditionalPersons).keys()].map(num => <option value={num} key={num}>{num}</option> )}
                </Field>
                <InfoFormField fieldName={'additionalPersons'} isAdditionalPersons/>

                <hr />

                <label htmlFor="tariff">Тариф</label>
                <Field name="tariff" as="select">
                    {Object.keys(tariffs).map(tariff => <option value={tariffs[tariff]} key={tariff}>{tariff}</option>)}
                </Field>
                <InfoFormField fieldName={'tariff'} />

                <label htmlFor="percentageDiscount">Скидка %</label>
                <Field name="percentageDiscount" type="number" min={0} max={100}/>

                <label htmlFor="moneyDiscount">Скидка</label>
                <Field name="moneyDiscount" type="number" min={0} />
                <span>{currentCurrency}</span>

                <hr />

                <label htmlFor="price">Сумма</label>
                <PriceField name="price" type="text" rentInterval={rentInterval} readOnly />

                <hr />

                <label htmlFor="comment">Комментрий :</label>
                <Field name="comment" as="textarea" rows={5} cols={70}/>

                <SaveCloseButtons closeHandler={closeModal}/>
            </Form>
        </Formik>
    )
}

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

function PriceField(props) {
    const {rentInterval, name, ...restProps} = props
    const {
        values:{
            tariff,
            percentageDiscount,
            moneyDiscount,
            additionalPersons,
        },
        setFieldValue,
    } = useFormikContext()
    const [field, meta] = useField(name)

    useEffect(() => {
        const price = getPrice(intervalLength(rentInterval), tariff, additionalPersons)
        const moneyDiscountCalc = Number((price * percentageDiscount/100).toFixed(2)) || moneyDiscount

        setFieldValue(name, `${price-moneyDiscountCalc} ${currentCurrency}`)
        setFieldValue('moneyDiscount', moneyDiscountCalc)

    }, [tariff, percentageDiscount, additionalPersons, moneyDiscount, rentInterval, name]);

    return (
        <>
            <input {...restProps} {...field} />
            {!!meta.touched && !!meta.error && <ErrorMessageElement>{meta.error}</ErrorMessageElement>}
        </>
    )
}
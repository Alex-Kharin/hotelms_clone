import React from 'react'
import styled from 'styled-components'
import {TodayMarker} from '../../simpleElements/TodayMarker'
import {Rent} from '../Rent'
import {border, selectionColor, weekendColor} from '../../../settings/settings'
import {withModal} from '../../Modal/withModal'
import {OrderCreationForm} from '../../Forms/OrderCreationForm'


const CellWrapper = styled.div.attrs(props =>
    ({'data-date': props.date, 'data-apartment_id': props.apartmentId, 'data-apartments_type': props.apartmentsType}))`
  position: relative;
  text-align: center;
  user-select: none;
  border: ${props => props.isSelect ? 'none' : border};
  background-color: ${props => props.isSelect ? selectionColor : props.isWeekend ? weekendColor : 'inherit'};
  cursor: ${props => props.isSelect ? 'cell' : null};
`

const TopString = styled.span`
  color: midnightblue;
  font-weight: ${props => props.topStringFontWeight || 'bold'};
`

const BottomString = styled.span`
  color: gray;
  font-weight: ${props => props.bottomStringFontWeight || 'bold'};
`

const ModalRent = withModal(Rent)

export function TableCell(props) {
    const {
        isWeekend, date, apartmentId, isSelect, apartmentsType, isToday, isRent, isLeftArrow, isRightArrow,
        rentInfo, index, tariffs, numberOfPersons, isOpenModal, setIsOpenModal, createUpdateRentInfo, deleteRentInfo,
    } = props

    const topString = props.topString ? <TopString>{props.topString}</TopString> : null
    const bottomString = props.bottomString ? <BottomString>{props.bottomString}</BottomString> : null

    return (
        <CellWrapper
            isWeekend={isWeekend}
            date={date}
            apartmentId={apartmentId}
            isSelect={isSelect}
            apartmentsType={apartmentsType}
        >
            {isToday && <TodayMarker/>}
            {isRent &&
            <ModalRent
                cellDimensions={props.cellDimensions}
                viewRentInterval={isRent}
                isLeftArrow={isLeftArrow}
                isRightArrow={isRightArrow}
                rentInfo={rentInfo}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
            >
                <OrderCreationForm
                    rentInfo={rentInfo}
                    index={index}
                    apartmentsType={apartmentsType}
                    tariffs={tariffs}
                    apartmentId={apartmentId}
                    numberOfPersons={numberOfPersons}
                    createUpdateRentInfo={createUpdateRentInfo}
                    deleteRentInfo={deleteRentInfo}
                />
            </ModalRent>}
            {topString}
            <br/>
            {bottomString}
        </CellWrapper>
    )
}
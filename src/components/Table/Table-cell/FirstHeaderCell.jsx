import {Button} from '../../simpleElements/Button'
import React from 'react'
import styled from 'styled-components'
import {DatePicker} from './DatePicker'
import {border} from '../../../settings/settings'


const Wrapper = styled.div`
  grid-row: 1/3;
  border: ${border};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const DateChoiceWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

const ColumnTitle = styled.div`
text-align: center;
`

export function FirstHeaderCell(props) {
    const {shiftFrom, fromDay, onClick} = props

    return (
        <Wrapper>
            <DateChoiceWrapper>
                <DatePicker shiftFrom={shiftFrom} fromDay={fromDay}/>
                <Button iconName={"schedule"} onClick={onClick} isFlex/>
            </DateChoiceWrapper>
            <ColumnTitle>Номера</ColumnTitle>
        </Wrapper>
    )
}
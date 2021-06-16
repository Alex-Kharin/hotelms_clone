import {Button} from '../../../Button/Button'
import React from 'react'
import styled from 'styled-components'
import DatePicker from './DatePicker'


const Wrapper = styled.div`
  grid-row: 1/3;
  border: 1px solid black;
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

const DateChoice = styled.span`
  border: 1px solid black;
  border-left: 5px solid red;
  padding: 5px;
  border-radius: 5px;
`

export function FirstHeaderCell(props) {
    return (
        <Wrapper>
            <DateChoiceWrapper>
                <DateChoice><DatePicker shiftFrom={props.shiftFrom} fromDay={props.fromDay}/></DateChoice>
                <Button iconName={"schedule"} onClick={props.onClick} isFlex/>
            </DateChoiceWrapper>
            <ColumnTitle>Номера</ColumnTitle>
        </Wrapper>
    )
}
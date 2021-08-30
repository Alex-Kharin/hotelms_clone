import React from 'react'
import styled from 'styled-components'
import {Button} from '../simpleElements/Button'


const ButtonsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 5px;
`

export function SaveCloseButtons(props) {
    const {closeHandler, notSave} = props

    return <ButtonsWrapper>
        {!notSave && <Button type="submit" size={'0.8em'}>Save</Button>}
        <Button type="button" onClick={closeHandler} size={'0.8em'}>Close</Button>
    </ButtonsWrapper>
}
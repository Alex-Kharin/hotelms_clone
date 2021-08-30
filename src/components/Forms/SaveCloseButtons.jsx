import React, {useContext} from 'react'
import styled from 'styled-components'
import {Button} from '../simpleElements/Button'
import {ModalContext} from '../context'


const ButtonsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 5px;
`

export function SaveCloseButtons(props) {
    const {notSave} = props
    const closeModal = useContext(ModalContext)

    return (
            <ButtonsWrapper>
                {!notSave && <Button type="submit" size={'0.8em'}>Save</Button>}
                <Button type="button" onClick={closeModal} size={'0.8em'}>Close</Button>
            </ButtonsWrapper>
    )
}
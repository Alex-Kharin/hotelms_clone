import React from 'react'
import {TableContainer} from '../Table/TableContainer'
import styled from 'styled-components'
import {border, MainBgColor} from '../../settings/settings'


const MainWrapper = styled.main`
  grid-area: main;
  border: ${border};
  background: ${MainBgColor};
  overflow-x: auto;
`

export function Main(props) {

    return <MainWrapper>
        <TableContainer/>
    </MainWrapper>
}
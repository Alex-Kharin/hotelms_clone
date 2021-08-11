import React from 'react'
import preloader from '../../assets/images/preloader.svg'
import styled from 'styled-components'
import {displayFlexAlignCenter} from '../../settings/settings'


const PreloaderWrapper = styled.div`
  grid-column: 1/-1;
  ${displayFlexAlignCenter};
  justify-content: center;
`

export const Preloader = () => {
    return <PreloaderWrapper>
        <img src={preloader} alt='preload...'/>
    </PreloaderWrapper>
}
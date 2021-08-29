import React from 'react'
import preloader from '../../assets/images/rent_preloader.svg'
import styled from 'styled-components'


const PreloaderWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: url(${preloader}) repeat-x;
  height: 100%;
  width: 100%;
  z-index: 460;
`

export const RentPreloader = () => <PreloaderWrapper />

import React from 'react'
import styled from 'styled-components'
import {todayMarkerZIndex} from '../../../settings/settings'


const Circle = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: crimson;
  top: -30%;
  right: 5%;
  z-index: ${todayMarkerZIndex};
`

const VerticalLine = styled.div`
  position: absolute;
  height: 75vh;
  border-left: 2px solid crimson;
  top: 0;
  right: 19%;
  z-index: ${todayMarkerZIndex};
`

export function TodayMarker() {
    return (
    <>
        <Circle/>
        <VerticalLine/>
    </>)
}
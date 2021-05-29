import React from 'react'
import styled from 'styled-components'

const Circle = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: crimson;
  top: -30%;
  right: 30%;
  z-index: 500;
`

const VerticalLine = styled.div`
  position: absolute;
  height: 74vh;
  border-left: 2px solid crimson;
  top: 0;
  right: 45%;
  z-index: 500;
`

export function TodayMarker() {
    return (
    <>
        <Circle/>
        <VerticalLine />
    </>)
}
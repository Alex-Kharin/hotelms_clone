import React from "react";
import styled from 'styled-components'
import {rentElementColor, rentElementsZIndex, borderMix} from '../../settings/settings'
import {widthRentElement} from './utils/utils'
import {Icon} from '../simpleElements/Icon'


const RentWrapper = styled.div`
  position: absolute;
  top: 1px;
  left: 50%;
  border: ${borderMix(undefined, undefined, '#0237bd')};
  background-color: ${rentElementColor};
  width: ${props => widthRentElement(props.cellDimensions, props.viewRentInterval)};
  min-width: ${({cellDimensions}) => cellDimensions.width / 2 - 1}px;
  height: ${({cellDimensions}) => cellDimensions.height - 2}px;
  z-index: ${rentElementsZIndex};
`

const Arrow = styled(Icon)`
  position: absolute;
  top: 5px;
  ${props => props.position}: -15px;
  color:red;
`

export function Rent({children, cellDimensions, viewRentInterval, isLeftArrow, isRightArrow}) {
    return (
        <RentWrapper cellDimensions={cellDimensions} viewRentInterval={viewRentInterval}>
            {isLeftArrow && <Arrow position={'left'}>arrow_left</Arrow>}
            {isRightArrow && <Arrow position={'right'}>arrow_right</Arrow>}


            {children}
        </RentWrapper>
    )
}
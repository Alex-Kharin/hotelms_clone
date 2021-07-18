import React from "react";
import styled from 'styled-components'
import {intervalToDuration} from 'date-fns'
import {rentElementsZIndex} from '../../../settings/settings'


const RentWrapper = styled.div`
  position: absolute;
  top: 1px;
  left: 50%;
  border: 1px solid #0237bd;
  background-color: #00c0e7;
  width: ${({
              cellDimensions,
              viewRentInterval
            }) => cellDimensions.width * intervalToDuration(viewRentInterval).days + intervalToDuration(viewRentInterval).days * 2}px;
  min-width: ${({cellDimensions}) => cellDimensions.width / 2 - 1}px;
  height: ${({cellDimensions}) => cellDimensions.height - 2}px;
  z-index: ${rentElementsZIndex};
`

export function Rent({children, cellDimensions, viewRentInterval, isLeftArrow, isRightArrow}) {
    return (
        <RentWrapper cellDimensions={cellDimensions} viewRentInterval={viewRentInterval}>
            <div style={{position: 'relative', border: '1px solid green', height: '100%'}}>
                {isLeftArrow && <span className="material-icons material-icons-outlined"
                                       style={{position: 'absolute', top: '5px', left: '-15px', color:'red'}}>arrow_left</span>}
                {isRightArrow && <span className="material-icons material-icons-outlined"
                                      style={{position: 'absolute', top: '5px', right: '-15px', color:'red'}}>arrow_right</span>}
                {children}
            </div>
        </RentWrapper>
    )
}
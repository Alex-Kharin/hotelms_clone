import React from "react";
import styled from 'styled-components'
import {rentElementColor, rentElementsZIndex, borderMix} from '../../settings/settings'
import {getTime, widthRentElement} from './utils/utils'
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
  
  :hover {
    cursor: pointer;
  }
`

const Arrow = styled(Icon)`
  position: absolute;
  top: 5px;
  ${props => props.position}: -15px;
  color:red;
`

const FullName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Tag = styled.div`
  position: absolute;
  top: ${props => props.top ?? ''};
  bottom: ${props => props.bottom ?? ''};
  left: ${props => props.left ?? ''};
  right: ${props => props.right ?? ''};
  background-color: ${props => props.background || 'chocolate'};
  font-size: 0.7em;
`

export function Rent(props) {
    const {openModal, cellDimensions, viewRentInterval, isLeftArrow, isRightArrow, rentInfo} = props
    const {rentInterval, personInfo:{firstName='Аноним', lastName='', email='', phone=''}={}, additionalPersons=null, tariff='',
        percentageDiscount=0, moneyDiscount=0, price=0} = rentInfo
    return (
        <RentWrapper onClick={openModal} cellDimensions={cellDimensions} viewRentInterval={viewRentInterval}>
            {isLeftArrow && <Arrow position={'left'}>arrow_left</Arrow>}
            {isRightArrow && <Arrow position={'right'}>arrow_right</Arrow>}
            <FullName>{firstName} {lastName}</FullName>
            <Tag top={0} right={0}>{price}</Tag>
            <Tag bottom={0} left={0} background={'#2c79dc'}>{getTime(rentInterval.start)}</Tag>
            <Tag bottom={0} right={0} background={'#2c79dc'}>{getTime(rentInterval.end)}</Tag>
        </RentWrapper>
    )
}
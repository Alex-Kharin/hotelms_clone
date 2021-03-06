import React from 'react'
import styled from 'styled-components'
import {
    borderMix,
    currentCurrency,
    rentElementColor,
    rentElementsZIndex
} from '../../settings/settings'
import {dateToString, getTime, intervalLength, widthRentElement} from '../../Utils/utils'
import {Icon} from '../simpleElements/Icon'
import ReactTooltip from 'react-tooltip'
import {RentPreloader} from '../simpleElements/RentPreloader'


const RentWrapper = styled.div.attrs(props => ({'data-tip': '', 'data-for': props.forTooltip}))`
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
  color: red;
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

const Ul = styled.ul`
  text-align: left;
  list-style-type: none;
`

const TooltipSpan = styled.span`
  color: #78e556;
`

export function Rent(props) {
    const {openModal, cellDimensions, viewRentInterval, isLeftArrow, isRightArrow, rentInfo, isUpdating} = props
    const {
        id,
        rentInterval,
        personInfo: {firstName = 'Аноним', lastName = '', email = '', phone = ''} = {},
        additionalPersons = null,
        tariff = '',
        percentageDiscount = 0,
        moneyDiscount = 0,
        price = 0,
        comment=''
    } = rentInfo
    return (
        <>
            <RentWrapper onClick={openModal} cellDimensions={cellDimensions} viewRentInterval={viewRentInterval} forTooltip={`${id}`}>
                {isUpdating.id === id && isUpdating.preloader && <RentPreloader/>}
                {isLeftArrow && <Arrow position={'left'}>arrow_left</Arrow>}
                {isRightArrow && <Arrow position={'right'}>arrow_right</Arrow>}
                <FullName>{lastName} {firstName}</FullName>
                <Tag top={0} right={0}>{price}</Tag>
                <Tag bottom={0} left={0} background={'#2c79dc'}>{getTime(rentInterval.start)}</Tag>
                <Tag bottom={0} right={0} background={'#2c79dc'}>{getTime(rentInterval.end)}</Tag>
            </RentWrapper>
            <ReactTooltip place="bottom" type="dark" effect="float" id={`${id}`}>
                <Ul>
                    <li>Order №<TooltipSpan>{id}</TooltipSpan></li>
                    <li>Check-in: <TooltipSpan>{dateToString(rentInterval.start)}</TooltipSpan> at <TooltipSpan>{getTime(rentInterval.start)}</TooltipSpan></li>
                    <li>Check-out: <TooltipSpan>{dateToString(rentInterval.end)}</TooltipSpan> at <TooltipSpan>{getTime(rentInterval.end)}</TooltipSpan></li>
                    <li>Nights: <TooltipSpan>{intervalLength(rentInterval)}</TooltipSpan></li>
                    {lastName && firstName && <li>Guest: <TooltipSpan>{lastName} {firstName}</TooltipSpan></li>}
                    {email && <li>Email: <TooltipSpan>{email}</TooltipSpan></li>}
                    {phone && <li>Phone.: <TooltipSpan>{phone}</TooltipSpan></li>}
                    {!!additionalPersons && <li>Additional persons.: <TooltipSpan>{additionalPersons}</TooltipSpan></li>}
                    {tariff && <li>Tariff: <TooltipSpan>{tariff}</TooltipSpan></li>}
                    {!!(percentageDiscount || moneyDiscount) && <li>Discount: <TooltipSpan>{percentageDiscount}% ({moneyDiscount} {currentCurrency}.)</TooltipSpan></li>}
                    {!!price && <li>Total amount: <TooltipSpan>{price}.</TooltipSpan></li>}
                    <li>Comment: <TooltipSpan>{comment ? 'Yes': 'No'}</TooltipSpan></li>
                </Ul>
            </ReactTooltip>
        </>
    )
}
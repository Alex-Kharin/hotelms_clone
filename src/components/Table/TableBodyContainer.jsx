import {connect} from "react-redux";
import {TableBody} from './TableBody'
import {
    leftSideShiftLeftViewRentInterval,
    leftSideShiftRightViewRentInterval,
    rightSideShiftLeftViewRentInterval,
    rightSideShiftRightViewRentInterval,
    setIsOpenModal,
    setRentInfo
} from '../../store/tableHotelRoomsReducer'
import {
    getApartments,
    getCellDimensions, getIsOpenModal,
    getTariffs,
    getViewRentIntervals
} from '../../store/tableBodyContainerSelectors'


function mapStateToProps(state, ownProps) {
    return {
        days: ownProps.days,
        selectInterval: ownProps.selectInterval,
        apartmentId: ownProps.apartmentId,
        apartments: getApartments(state),
        cellDimensions: getCellDimensions(state),
        viewRentIntervals: getViewRentIntervals(state),
        tariffs: getTariffs(state),
        isOpenModal: getIsOpenModal(state),
    }
}

const mapDispatchToProps = {
    leftSideShiftLeftViewRentInterval,
    leftSideShiftRightViewRentInterval,
    rightSideShiftLeftViewRentInterval,
    rightSideShiftRightViewRentInterval,
    setRentInfo,
    setIsOpenModal,

}

export const TableBodyContainer = connect(mapStateToProps, mapDispatchToProps)(TableBody)
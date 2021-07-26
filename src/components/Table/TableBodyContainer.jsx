import {connect} from "react-redux";
import {TableBody} from './TableBody'
import {
    leftSideShiftLeftViewRentInterval,
    leftSideShiftRightViewRentInterval, rightSideShiftLeftViewRentInterval, rightSideShiftRightViewRentInterval
} from '../../store/tableHotelRoomsReducer'
import {getApartments, getCellDimensions, getViewRentIntervals} from '../../store/tableBodyContainerSelectors'


function mapStateToProps(state, ownProps) {
    return {
        days: ownProps.days,
        selectInterval: ownProps.selectInterval,
        apartmentId: ownProps.apartmentId,
        apartments: getApartments(state),
        cellDimensions: getCellDimensions(state),
        viewRentIntervals: getViewRentIntervals(state),
    }
}

const mapDispatchToProps = {
    leftSideShiftLeftViewRentInterval,
    leftSideShiftRightViewRentInterval,
    rightSideShiftLeftViewRentInterval,
    rightSideShiftRightViewRentInterval,

}

export const TableBodyContainer = connect(mapStateToProps, mapDispatchToProps)(TableBody)
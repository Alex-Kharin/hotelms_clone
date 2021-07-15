import {connect} from "react-redux";

import {TableBody} from './TableBody'
import {
    leftSideShiftLeftViewRentInterval,
    leftSideShiftRightViewRentInterval, rightSideShiftLeftViewRentInterval, rightSideShiftRightViewRentInterval
} from '../../../../store/tableHotelRoomsReducer'


function mapStateToProps(state, ownProps) {
    return {
        days: ownProps.days,
        selectInterval: ownProps.selectInterval,
        apartmentId: ownProps.apartmentId,
        apartments: state.tableApartments.apartments,
        cellDimensions: state.tableApartments.cellDimensions,
        viewRentIntervals:state.tableApartments.viewRentIntervals
    }
}

const mapDispatchToProps = {

    leftSideShiftLeftViewRentInterval,
    leftSideShiftRightViewRentInterval,
    rightSideShiftLeftViewRentInterval,
    rightSideShiftRightViewRentInterval,

}


export const TableBodyContainer = connect(mapStateToProps, mapDispatchToProps)(TableBody)
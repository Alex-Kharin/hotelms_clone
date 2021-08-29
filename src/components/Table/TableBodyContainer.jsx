import {connect} from 'react-redux'
import {TableBody} from './TableBody'
import {
    leftSideShiftLeftViewRentInterval,
    leftSideShiftRightViewRentInterval,
    requestApartments,
    rightSideShiftLeftViewRentInterval,
    rightSideShiftRightViewRentInterval,
    setIsOpenModal,
    createUpdateRentInfo,
    deleteRentInfo
} from '../../store/tableApartmentsReducer'
import {
    getApartments,
    getCellDimensions, getDays,
    getFreeApartments,
    getIsFetching,
    getIsOpenModal, getIsUpdating,
    getTariffs,
    getViewRentIntervals
} from '../../store/tableBodyContainerSelectors'
import {useEffect} from 'react'
import {Preloader} from '../simpleElements/Preloader'


export function TableBodyContainer(props) {
    const {isFetching, requestApartments} = props

    useEffect(()=>{
        if (isFetching) {
            requestApartments()
        }
    }, [isFetching])

    return(
        <>
            {isFetching && <Preloader/>}
            {!isFetching && <TableBody {...props} />}
        </>
    )
}

function mapStateToProps(state, ownProps) {
    return {
        interval: ownProps.interval,
        selectInterval: ownProps.selectInterval,
        apartmentId: ownProps.apartmentId,
        days: getDays(state),
        apartments: getApartments(state),
        cellDimensions: getCellDimensions(state),
        viewRentIntervals: getViewRentIntervals(state),
        tariffs: getTariffs(state),
        isOpenModal: getIsOpenModal(state),
        isFetching: getIsFetching(state),
        isUpdating: getIsUpdating(state),
        freeApartments: getFreeApartments(state)
    }
}

const mapDispatchToProps = {
    leftSideShiftLeftViewRentInterval,
    leftSideShiftRightViewRentInterval,
    rightSideShiftLeftViewRentInterval,
    rightSideShiftRightViewRentInterval,
    setIsOpenModal,
    requestApartments,
    createUpdateRentInfo,
    deleteRentInfo,

}

export default connect(mapStateToProps, mapDispatchToProps)(TableBodyContainer)

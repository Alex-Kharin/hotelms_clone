import {connect} from 'react-redux'
import {TableBody} from './TableBody'
import {
    cancelRent,
    leftSideShiftLeftViewRentInterval,
    leftSideShiftRightViewRentInterval,
    requestApartments,
    rightSideShiftLeftViewRentInterval,
    rightSideShiftRightViewRentInterval,
    setIsOpenModal,
    setRentInfo
} from '../../store/tableApartmentsReducer'
import {
    getApartments,
    getCellDimensions,
    getIsFetching,
    getIsOpenModal,
    getTariffs,
    getViewRentIntervals
} from '../../store/tableBodyContainerSelectors'
import {useEffect} from 'react'
import {Preloader} from '../simpleElements/Preloader'


export function TableBodyContainer(propsAll) {
    const {isFetching, requestApartments, ...props} = propsAll

    useEffect(()=>{
        if (isFetching) {
            requestApartments()
        }
    }, [isFetching])

    return(
        <>
            {isFetching && <Preloader/>}
            <TableBody {...props} />
        </>
    )
}

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
        isFetching: getIsFetching(state)
    }
}

const mapDispatchToProps = {
    leftSideShiftLeftViewRentInterval,
    leftSideShiftRightViewRentInterval,
    rightSideShiftLeftViewRentInterval,
    rightSideShiftRightViewRentInterval,
    setRentInfo,
    setIsOpenModal,
    cancelRent,
    requestApartments,

}

// export const TableBodyContainer = connect(mapStateToProps, mapDispatchToProps)(TableBody)
export default connect(mapStateToProps, mapDispatchToProps)(TableBodyContainer)
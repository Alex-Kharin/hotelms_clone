

const DAYS_IN_TABLE = 'DAYS_IN_TABLE'


const initialState ={
    standard: [
        {
            apartmentsNumber: 100,
            numberOfPersons: 2,
            rentFrom: null,
            rentTo: null,
            chekInTime: null,
            chekOutTime: null,
            isFree: true,
        },
        {
            apartmentsNumber: 122,
            numberOfPersons: 2,
            rentFrom: null,
            rentTo: null,
            chekInTime: null,
            chekOutTime: null,
            isFree: true,
        },
        {
            apartmentsNumber: 145,
            numberOfPersons: 2,
            rentFrom: null,
            rentTo: null,
            chekInTime: null,
            chekOutTime: null,
            isFree: true,
        },
        {
            apartmentsNumber: 201,
            numberOfPersons: 3,
            rentFrom: null,
            rentTo: null,
            chekInTime: null,
            chekOutTime: null,
            isFree: true,
        },
        {
            apartmentsNumber: 210,
            numberOfPersons: 3,
            rentFrom: null,
            rentTo: null,
            chekInTime: null,
            chekOutTime: null,
            isFree: true,
        }
    ],
    comfortable: [
            {
                apartmentsNumber: 300,
                numberOfPersons: 2,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            },
            {
                apartmentsNumber: 322,
                numberOfPersons: 2,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            },
            {
                apartmentsNumber: 345,
                numberOfPersons: 2,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            },
            {
                apartmentsNumber: 401,
                numberOfPersons: 3,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            },
            {
                apartmentsNumber: 410,
                numberOfPersons: 3,
                rentFrom: null,
                rentTo: null,
                chekInTime: null,
                chekOutTime: null,
                isFree: true,
            }
        ],
    lux: [
        {
            apartmentsNumber: 500,
            numberOfPersons: 5,
            rentFrom: null,
            rentTo: null,
            chekInTime: null,
            chekOutTime: null,
            isFree: true,
        },
        {
            apartmentsNumber: 601,
            numberOfPersons: 5,
            rentFrom: null,
            rentTo: null,
            chekInTime: null,
            chekOutTime: null,
            isFree: true,
        },
        {
            apartmentsNumber: 610,
            numberOfPersons: 5,
            rentFrom: null,
            rentTo: null,
            chekInTime: null,
            chekOutTime: null,
            isFree: true,
        }
    ],
}

function tableHotelRoomsReducer(state=initialState, action){
    switch (action.type) {
        case DAYS_IN_TABLE: {
            return {
                ...state,

            }
        }

        default: return state
    }
}

// const changeDaysInTable = (days) => ({type: DAYS_IN_TABLE, days})

export {tableHotelRoomsReducer, }





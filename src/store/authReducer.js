
const SET_USER_DATA = 'hotelms_clone/auth/SET_USER_DATA'

let user = {
    userId: 1,
    email: 'example@mail.com',
    login: 'user',
    password: 'user',
}

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA, payload:
        {userId, email, login, isAuth}
})

export const login = ({login, password}, actions) => (dispatch) => {
    try {
        if (login === user.login && password === user.password) {
            dispatch(setAuthUserData(user.userId, user.email, login, true))
        } else {
            throw new Error('Unable to login with the provided credentials.')
        }
    } catch (e) {
        console.error(e)
        actions.setErrors({'api':e.message})
    }


}


export const logout = () => (dispatch) => {
    dispatch(setAuthUserData(null, null, null, false))
}

export default authReducer;
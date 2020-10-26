import {
    CLEAR_MESSAGE,
    SET_APP_TITLE,
    SET_FETCHING,
    SET_MESSAGE,
    SET_READY,
} from "../actions/appActions"

const initialState = {
    title: 'App',
    ready: false,
    isFetching: false,
    message: null,
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.fetching
            }
        case SET_READY:
            return {
                ...state,
                ready: action.ready
            }
        case SET_APP_TITLE:
            return {
                ...state,
                title: action.title
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: {type: action.payload.type, text: action.payload.text}
            }
        case CLEAR_MESSAGE:
            return {
                ...state,
                message: null
            }
        default: return state
    }
}

export default AppReducer
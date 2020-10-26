export const SET_FETCHING = 'SET_FETCHING'
export const SET_READY = 'SET_READY'
export const SET_APP_TITLE = 'SET_APP_TITLE'
export const SET_MESSAGE = 'SET_MESSAGE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'

export const setFetching = fetching => ({type: SET_FETCHING, fetching})
export const setReady = ready => ({type: SET_READY, ready})
export const setAppTitle = title => ({type: SET_APP_TITLE, title})
export const setMessage = (type, text) => ({type: SET_MESSAGE, payload: {type, text}})
export const clearMessage = () => ({type: CLEAR_MESSAGE})
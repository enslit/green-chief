import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, compose, createStore} from 'redux'
import RootReducer from "./redux/reducers/root-reducer"
import thunk from "redux-thunk"
import {Provider} from "react-redux"
import AppContainer from "./components/AppContainer"

const store = createStore(
    RootReducer,
    compose(
        applyMiddleware(
            thunk
        ),
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

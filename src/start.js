import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import Field from "./field";
import { Provider } from "react-redux";
import { init } from "./socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
init(store);

ReactDOM.render(
    <Provider store={store}>
        <div>
            <h1 className="site-header">Battleship</h1>
            <div className="fields-container">
                <Field />
                <Field />
            </div>
        </div>
    </Provider>,
    document.querySelector("main")
);

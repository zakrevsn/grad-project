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
            <div className="fields-container">
                <Field myField={true} />
                <div className="pics-container">
                    <img className="pirates" src="/images/pirates-filled.png" />
                    <img className="anchor" src="/images/anchor-filled.png" />
                </div>
                <Field myField={false} />
            </div>
        </div>
    </Provider>,
    document.querySelector("main")
);

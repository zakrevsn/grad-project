import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { init } from "./socket";
import Play from "./play";
import Footer from "./footer";
import Header from "./header";
import { Route, BrowserRouter, Link } from "react-router-dom";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
init(store);

ReactDOM.render(
    <Provider store={store}>
        <div className="gamebody">
            <Header />
            <BrowserRouter>
                <Route path="/play" component={Play} />
            </BrowserRouter>
            <Footer />
        </div>
    </Provider>,
    document.querySelector("main")
);

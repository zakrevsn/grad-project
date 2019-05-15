import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import { init } from "./socket";
import Play from "./play";
import { Route, BrowserRouter, Link } from "react-router-dom";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
init(store);

ReactDOM.render(
    <Provider store={store}>
        <div className="gamebody">
            <header className="header">
                <h1 className="site-header">Battleship</h1>
                <div className="sub-header" />
            </header>
            <BrowserRouter>
                <Route path="/play" component={Play} />
            </BrowserRouter>
            <footer className="footer">
                <button className="new-game">NEW GAME</button>
                <div>
                    <img className="waves" src="/images/sea-waves.png" />
                </div>
                <div>
                    <img className="yellowsub" src="/images/submarine2.png" />
                </div>
                <button className="quit">QUIT</button>
            </footer>
        </div>
    </Provider>,
    document.querySelector("main")
);

import * as io from "socket.io-client";
import { gameState, shipFeedback } from "./actions";

export let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("gameState", game => {
        console.log("gameState", game);
        store.dispatch(gameState(game));
    });

    socket.on("shipFeedback", message => {
        console.log("shipFeedback", message);
        store.dispatch(shipFeedback(message));
    });
}

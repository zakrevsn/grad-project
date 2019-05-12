import * as io from "socket.io-client";
import { gameState } from "./actions";

export let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();
    }

    socket.on("gameState", game => {
        console.log("gameState", game);
        store.dispatch(gameState(game));
    });
}

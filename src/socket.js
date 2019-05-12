import * as io from "socket.io-client";

export let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();
    }
}

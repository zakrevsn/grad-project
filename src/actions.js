export function gameState(game) {
    return {
        type: "GAME_STATE",
        game
    };
}

export function shipFeedback(message) {
    return {
        type: "SHIP_FEEDBACK",
        message
    };
}

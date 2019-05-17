export default function reducer(state, action) {
    if (action.type == "GAME_STATE") {
        return Object.assign({}, state, {
            game: action.game
        });
    }
    if (action.type == "SHIP_FEEDBACK") {
        return Object.assign({}, state, {
            message: action.message
        });
    }
    return state;
}

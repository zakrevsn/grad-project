export default function reducer(state, action) {
    if (action.type == "GAME_STATE") {
        return Object.assign({}, state, {
            game: action.game
        });
    }
    return state;
}

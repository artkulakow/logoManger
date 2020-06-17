import {KITS, FETCH_KITS} from '../actions/actionTypes';

export default (state, action) => {
    switch (action.type) {
        case KITS:
            return {
                ...state,
                kits: action.payload,
            }
        case FETCH_KITS:
            return {
                ...state,
                fetchKits: action.payload,
            }
        default:
            return state;
    }
}
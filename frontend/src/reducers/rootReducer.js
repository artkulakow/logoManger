import {KITS, FETCH_KITS, SELECTED_KIT} from '../actions/actionTypes';

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
        case SELECTED_KIT:
            return {
                ...state,
                selectedKit: action.payload,
            }
        default:
            return state;
    }
}
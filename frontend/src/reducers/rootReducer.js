import {KITS, FETCH_KITS, SELECTED_KIT, GET_KITS_START, GET_KITS_SUCCESS, GET_KITS_FAILURE} from '../actions/actionTypes';
import { bindActionCreators } from 'redux';

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

        case GET_KITS_START:
            return {
                ...StaticRange,
                kitsLoading: true,
            }
        case GET_KITS_SUCCESS:
            console.log(action)
            return {
                ...state,
                kitsLoading: false,
                kitsError: null,
                kits: action.kits.data.kits
            }
        case GET_KITS_FAILURE:
            console.log(action)
            return {
                ...state,
                kitsLoading: false,
                kitsError: action.kitsError,
            }
        default:
            return state;
    }
}
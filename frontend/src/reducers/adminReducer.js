import {ADMIN_UNITS} from '../actions/actionTypes';
import { bindActionCreators } from 'redux';

export default function admin(state = {}, action) {
    switch (action.type) {
        case ADMIN_UNITS:
            return {
                ...state,
                adminUnits: action.payload,
            }
        case 'TEST':
            return {
                ...state,
                adminText: action.payload,
            }
        default:
            return state;
    }
}

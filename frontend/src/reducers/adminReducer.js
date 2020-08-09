import {
    ADMIN_UNITS, ADMIN_USER_NAME, ADMIN_FIRST_NAME, ADMIN_LAST_NAME,
    ADMIN_EMAIL_ADDRESS, ADMIN_PASSWORD,
} from '../actions/actionTypes';

export default function admin(state = {}, action) {
    switch (action.type) {
        case ADMIN_UNITS:
            return {
                ...state,
                adminUnits: action.payload,
            }
        case ADMIN_USER_NAME:
            return {
                ...state,
                adminUserName: action.payload,
            }
        case ADMIN_FIRST_NAME:
            return {
                ...state,
                adminFirstName: action.payload,
            }
        case ADMIN_LAST_NAME:
            return {
                ...state,
                adminLastName: action.payload,
            }
        case ADMIN_EMAIL_ADDRESS:
            return {
                ...state,
                adminEmailAddress: action.payload,
            }
        case ADMIN_PASSWORD:
            return {
                ...state,
                adminPassword: action.payload,
            }
        default:
            return state;
    }
}

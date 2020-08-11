import {
    ADMIN_UNITS, ADMIN_USER_NAME, ADMIN_FIRST_NAME, ADMIN_LAST_NAME,
    ADMIN_EMAIL_ADDRESS, ADMIN_PASSWORD, GET_ADMIN_USER_START,
    GET_ADMIN_USER_SUCCESS, GET_ADMIN_USER_FAILURE,
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

        case GET_ADMIN_USER_START:
            return {
                ...state,
                adminUserLoading: true,
            }
        case GET_ADMIN_USER_SUCCESS:
            return {
                ...state,
                adminUserLoading: false,
                adminUserError: null,
                adminUser: action.user.data.user
            }
        case GET_ADMIN_USER_FAILURE:
            console.log('reducers => adminUser: ', {...action.adminUser})
            return {
                ...state,
                adminUserLoading: false,
                adminUserError: action.adminUserError,
            }
    
        default:
            return state;
    }
}

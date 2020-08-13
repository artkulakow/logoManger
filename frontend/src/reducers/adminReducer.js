import {
    ADMIN_USER_ID, GET_ADMIN_USER_START,
    GET_ADMIN_USER_SUCCESS, GET_ADMIN_USER_FAILURE,
    MODIFY_ADMIN_USER_START, MODIFY_ADMIN_USER_SUCCESS, MODIFY_ADMIN_USER_FAILURE,
} from '../actions/actionTypes';

export default function admin(state = {}, action) {
    switch (action.type) {
        case ADMIN_USER_ID:
            return {
                ...state,
                adminUserId: action.payload
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
            console.log('reducers => adminUser: ', {...action})
            return {
                ...state,
                adminUser: null,
                adminUserLoading: false,
                adminUserError: action.userError,
            }
    
        case MODIFY_ADMIN_USER_START:
            return {
                ...state,
                adminModifyUserLoading: true,
            }
        case MODIFY_ADMIN_USER_SUCCESS:
            return {
                ...state,
                adminModifyUserLoading: false,
                adminModifyUserError: null,
                adminModifyUser: action.user.data.user
            }
        case MODIFY_ADMIN_USER_FAILURE:
            console.log('reducers => adminUser: ', {...action})
            return {
                ...state,
                adminModifyUser: null,
                adminModifyUserLoading: false,
                adminModifyUserError: action.userError,
            }

        default:
            return state;
    }
}

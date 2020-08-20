import {
    ADMIN_USER_ID, GET_ADMIN_USER_START,
    GET_ADMIN_USER_SUCCESS, GET_ADMIN_USER_FAILURE,
    MODIFY_ADMIN_USER_START, MODIFY_ADMIN_USER_SUCCESS, MODIFY_ADMIN_USER_FAILURE,
    CREATE_ADMIN_USER_START, CREATE_ADMIN_USER_SUCCESS, CREATE_ADMIN_USER_FAILURE,
} from '../actions/actionTypes';

export default function admin(state = {}, action) {
    switch (action.type) {
    case ADMIN_USER_ID:
        return {
            ...state,
            adminUserId: action.payload,
        };

    case GET_ADMIN_USER_START:
        return {
            ...state,
            adminUserLoading: true,
        };
    case GET_ADMIN_USER_SUCCESS:
        return {
            ...state,
            adminUserLoading: false,
            adminUserError: null,
            adminUser: action.user.data.user,
        };
    case GET_ADMIN_USER_FAILURE:
        return {
            ...state,
            adminUser: null,
            adminUserLoading: false,
            adminUserError: action.userError,
        };

    case MODIFY_ADMIN_USER_START:
        return {
            ...state,
            adminModifyUserLoading: true,
        };
    case MODIFY_ADMIN_USER_SUCCESS:
        return {
            ...state,
            adminModifyUserLoading: false,
            adminModifyUserError: null,
            adminUser: action.user.data.user,
        };
    case MODIFY_ADMIN_USER_FAILURE:
        return {
            ...state,
            // adminUser: null,
            adminModifyUserLoading: false,
            adminModifyUserError: action.userError.response,
        };

    case CREATE_ADMIN_USER_START:
        return {
            ...state,
            adminCreateUserLoading: true,
            adminCreateUserError: null,
            adminCreateUserSuccess: false,
        };
    case CREATE_ADMIN_USER_SUCCESS:
        return {
            ...state,
            adminCreateUserLoading: false,
            adminCreateUserError: null,
            adminCreateUserSuccess: true,
            adminUser: action.user.data.user,
        };
    case CREATE_ADMIN_USER_FAILURE:
        return {
            ...state,
            // adminUser: null,
            adminCreateUserLoading: false,
            adminCreateUserError: action.userError.response,
            adminCreateUserSuccess: false,
        };

    default:
        return state;
    }
}

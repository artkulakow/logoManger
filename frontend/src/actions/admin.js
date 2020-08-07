import {ADMIN_UNITS, ADMIN_USER_NAME, ADMIN_FIRST_NAME, ADMIN_LAST_NAME} from './actionTypes.js'

export const setUnits = (payload) => {
    return {
        type: ADMIN_UNITS,
        payload
    }
};

export const setUserName = (payload) => {
    return {
        type: ADMIN_USER_NAME,
        payload
    }
};
export const setFirstName = (payload) => {
    return {
        type: ADMIN_FIRST_NAME,
        payload
    }
};
export const setLastName = (payload) => {
    return {
        type: ADMIN_LAST_NAME,
        payload
    }
};


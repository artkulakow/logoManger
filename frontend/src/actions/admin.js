import {
    ADMIN_UNITS, ADMIN_USER_NAME, ADMIN_FIRST_NAME, ADMIN_LAST_NAME,
    ADMIN_EMAIL_ADDRESS, ADMIN_PASSWORD,
} from './actionTypes.js'

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
export const setEmailAddress = (payload) => {
    return {
        type: ADMIN_EMAIL_ADDRESS,
        payload
    }
};
export const setPassword = (payload) => {
    return {
        type: ADMIN_PASSWORD,
        payload
    }
};


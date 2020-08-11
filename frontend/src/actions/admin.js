import axios from 'axios';

import {
    ADMIN_UNITS, ADMIN_USER_NAME, ADMIN_FIRST_NAME, ADMIN_LAST_NAME,
    ADMIN_EMAIL_ADDRESS, ADMIN_PASSWORD, GET_ADMIN_USER_START,
    GET_ADMIN_USER_SUCCESS, GET_ADMIN_USER_FAILURE,
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

export const getUser = (params = '') => {
    return (dispatch) => {
        dispatch({type: GET_ADMIN_USER_START});

        return axios.get('http://localhost:3100/users/' + encodeURI(params))
            .then (
                user => dispatch({type: GET_ADMIN_USER_SUCCESS, user}),
            )
            .catch((userError) => {
                dispatch({type: GET_ADMIN_USER_FAILURE, userError})
            });
    }
}

export const getUserStart = () => ({
    type: GET_ADMIN_USER_START
})

export const getUserSuccess = user => ({
    type: GET_ADMIN_USER_SUCCESS,
    payload: {
        ...user
    }
})

export const getUserFailure = error => ({
    type: GET_ADMIN_USER_FAILURE,
    payload: {
        error
    }
})

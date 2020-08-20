import axios from 'axios';

import {
    ADMIN_USER_ID, GET_ADMIN_USER_START,
    GET_ADMIN_USER_SUCCESS, GET_ADMIN_USER_FAILURE,
    MODIFY_ADMIN_USER_START, MODIFY_ADMIN_USER_SUCCESS, MODIFY_ADMIN_USER_FAILURE,
    CREATE_ADMIN_USER_START, CREATE_ADMIN_USER_SUCCESS, CREATE_ADMIN_USER_FAILURE,
} from './actionTypes';

export const setUserId = (payload) => ({
    type: ADMIN_USER_ID,
    payload,
});

export const getUser = (params = '') => (dispatch) => {
    dispatch({ type: GET_ADMIN_USER_START });

    return axios.get(`http://localhost:3100/users/${encodeURI(params)}`)
        .then(
            (user) => dispatch({ type: GET_ADMIN_USER_SUCCESS, user }),
        )
        .catch((userError) => {
            dispatch({ type: GET_ADMIN_USER_FAILURE, userError });
        });
};

export const getUserStart = () => ({
    type: GET_ADMIN_USER_START,
});

export const getUserSuccess = (user) => ({
    type: GET_ADMIN_USER_SUCCESS,
    payload: {
        ...user,
    },
});

export const getUserFailure = (error) => ({
    type: GET_ADMIN_USER_FAILURE,
    payload: {
        error,
    },
});

export const modifyUser = (userId, userName, firstName, lastName, email, units) => (dispatch) => {
    dispatch({ type: MODIFY_ADMIN_USER_START });

    return axios.put(`http://localhost:3100/users/${encodeURI(userId)}`, {
        userName,
        firstName,
        lastName,
        email,
        units,
    })
        .then(
            (user) => dispatch({ type: MODIFY_ADMIN_USER_SUCCESS, user }),
        )
        .catch((userError) => {
            dispatch({ type: MODIFY_ADMIN_USER_FAILURE, userError });
        });
};

export const modifyUserStart = () => ({
    type: MODIFY_ADMIN_USER_START,
});

export const modifyUserSuccess = (user) => ({
    type: MODIFY_ADMIN_USER_SUCCESS,
    payload: {
        ...user,
    },
});

export const modifyUserFailure = (error) => ({
    type: MODIFY_ADMIN_USER_FAILURE,
    payload: {
        error,
    },
});

export const createUser = (userName, firstName, lastName, email, units) => (dispatch) => {
    dispatch({ type: CREATE_ADMIN_USER_START });

    return axios.post('http://localhost:3100/users', {
        userName,
        firstName,
        lastName,
        email,
        units,
    })
        .then(
            (user) => dispatch({ type: CREATE_ADMIN_USER_SUCCESS, user }),
        )
        .catch((userError) => {
            dispatch({ type: CREATE_ADMIN_USER_FAILURE, userError });
        });
};

export const createUserStart = () => ({
    type: CREATE_ADMIN_USER_START,
});

export const createUserSuccess = (user) => ({
    type: CREATE_ADMIN_USER_SUCCESS,
    payload: {
        ...user,
    },
});

export const createUserFailure = (error) => ({
    type: CREATE_ADMIN_USER_FAILURE,
    payload: {
        error,
    },
});

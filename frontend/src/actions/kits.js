import {KITS, FETCH_KITS, SELECTED_KIT, GET_KITS_START, GET_KITS_SUCCESS, GET_KITS_FAILURE} from './actionTypes.js'
import axios from 'axios';

export const loadKits = (payload) => {
    return {
        type: KITS,
        payload
    }
};

export const setFetchKits = (payload) => {
    return {
        type: FETCH_KITS,
        payload
    }
}

export const setSelectedKit = (payload) => {
    return {
        type: SELECTED_KIT,
        payload
    }
}

export const getKits = (params = '') => {
    return (dispatch) => {
        dispatch({type: GET_KITS_START});

        return axios.get('http://localhost:3100/kits' + encodeURI(params)).then(
            kits => dispatch({type: GET_KITS_SUCCESS, kits}),
            kitsError => dispatch({type: GET_KITS_FAILURE, kitsError})
        )
    }
}

export const getKitsStart = () => ({
    type: GET_KITS_START
})

export const getKitsSuccess = kits => ({
    type: GET_KITS_SUCCESS,
    payload: {
        ...kits
    }
})

export const getKitsFailure = error => ({
    type: GET_KITS_FAILURE,
    payload: {
        error
    }
})
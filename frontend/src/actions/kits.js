import {KITS, FETCH_KITS, SELECTED_KIT, 
        GET_KITS_START, GET_KITS_SUCCESS, GET_KITS_FAILURE,
        GET_KITS_THEMES_START, GET_KITS_THEMES_SUCCESS, GET_KITS_THEMES_FAILURE,
        GET_KITS_LOCATIONS_START, GET_KITS_LOCATIONS_SUCCESS, GET_KITS_LOCATIONS_FAILURE,
    } from './actionTypes.js'
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

export const getKitsThemes = () => {
    return (dispatch) => {
        dispatch({type: GET_KITS_THEMES_START});

        return axios.get('http://localhost:3100/kits/themes').then(
            kitsThemes => dispatch({type: GET_KITS_THEMES_SUCCESS, kitsThemes}),
            kitsThemesError => dispatch({type: GET_KITS_THEMES_FAILURE, kitsThemesError})
        )
    }
}

export const getKitsThemesStart = () => ({
    type: GET_KITS_THEMES_START
})

export const getKitsThemesSuccess = kits => ({
    type: GET_KITS_THEMES_SUCCESS,
    payload: {
        ...kits
    }
})

export const getKitsThemesFailure = error => ({
    type: GET_KITS_THEMES_FAILURE,
    payload: {
        error
    }
})

export const getKitsLocations = () => {
    return (dispatch) => {
        dispatch({type: GET_KITS_LOCATIONS_START});

        return axios.get('http://localhost:3100/kits/Locations').then(
            kitsLocations => dispatch({type: GET_KITS_LOCATIONS_SUCCESS, kitsLocations}),
            kitsLocationsError => dispatch({type: GET_KITS_LOCATIONS_FAILURE, kitsLocationsError})
        )
    }
}

export const getKitsLocationsStart = () => ({
    type: GET_KITS_LOCATIONS_START
})

export const getKitsLocationsSuccess = kits => ({
    type: GET_KITS_LOCATIONS_SUCCESS,
    payload: {
        ...kits
    }
})

export const getKitsLocationsFailure = error => ({
    type: GET_KITS_LOCATIONS_FAILURE,
    payload: {
        error
    }
})
/* eslint-disable no-console */
import axios from 'axios';
import {
    KITS, FETCH_KITS, SELECTED_KIT,
    GET_KITS_START, GET_KITS_SUCCESS, GET_KITS_FAILURE,
    GET_KIT_DETAILS_START, GET_KIT_DETAILS_SUCCESS, GET_KIT_DETAILS_FAILURE,
    GET_KITS_THEMES_START, GET_KITS_THEMES_SUCCESS, GET_KITS_THEMES_FAILURE,
    GET_KITS_LOCATIONS_START, GET_KITS_LOCATIONS_SUCCESS, GET_KITS_LOCATIONS_FAILURE,
} from './actionTypes';

export const loadKits = (payload) => ({
    type: KITS,
    payload,
});

export const setFetchKits = (payload) => ({
    type: FETCH_KITS,
    payload,
});

export const setSelectedKit = (payload) => ({
    type: SELECTED_KIT,
    payload,
});

export const getKits = (params = '') => (dispatch) => {
    dispatch({ type: GET_KITS_START });

    return axios.get(`http://localhost:3100/kits${encodeURI(params)}`)
        .then(
            (kits) => dispatch({ type: GET_KITS_SUCCESS, kits }),
        )
        .catch((kitsError) => {
            console.error('getKits: ', { ...kitsError });
            dispatch({ type: GET_KITS_FAILURE, kitsError });
        });
};

export const getKitsStart = () => ({
    type: GET_KITS_START,
});

export const getKitsSuccess = (kits) => ({
    type: GET_KITS_SUCCESS,
    payload: {
        ...kits,
    },
});

export const getKitsFailure = (error) => ({
    type: GET_KITS_FAILURE,
    payload: {
        error,
    },
});

export const getKitDetails = (kitId = -1) => (dispatch) => {
    dispatch({ type: GET_KIT_DETAILS_START });

    return axios.get(`http://localhost:3100/kits/${kitId}`)
        .then(
            (details) => {
                dispatch({ type: GET_KIT_DETAILS_SUCCESS, details });
            },
        )
        .catch((kitDetailsError) => {
            console.error('getKitDetails: ', { ...kitDetailsError });
            dispatch({ type: GET_KIT_DETAILS_FAILURE, kitDetailsError });
        });
};

export const getKitDetailsStart = () => ({
    type: GET_KIT_DETAILS_START,
});

export const getKitDetailsSuccess = (details) => ({
    type: GET_KIT_DETAILS_SUCCESS,
    payload: {
        ...details,
    },
});

export const getKitDetailsFailure = (error) => ({
    type: GET_KIT_DETAILS_FAILURE,
    payload: {
        error,
    },
});

export const getKitsThemes = () => (dispatch) => {
    dispatch({ type: GET_KITS_THEMES_START });

    return axios.get('http://localhost:3100/kits/themes').then(
        (kitsThemes) => dispatch({ type: GET_KITS_THEMES_SUCCESS, kitsThemes }),
    )
        .catch((kitsError) => {
            console.log('getKitsThemes: ', { ...kitsError });
            dispatch({ type: GET_KITS_THEMES_FAILURE, kitsError });
        });
};

export const getKitsThemesStart = () => ({
    type: GET_KITS_THEMES_START,
});

export const getKitsThemesSuccess = (kits) => ({
    type: GET_KITS_THEMES_SUCCESS,
    payload: {
        ...kits,
    },
});

export const getKitsThemesFailure = (error) => ({
    type: GET_KITS_THEMES_FAILURE,
    payload: {
        error,
    },
});

export const getKitsLocations = () => (dispatch) => {
    dispatch({ type: GET_KITS_LOCATIONS_START });

    return axios.get('http://localhost:3100/kits/Locations').then(
        (kitsLocations) => dispatch({ type: GET_KITS_LOCATIONS_SUCCESS, kitsLocations }),
        (kitsLocationsError) => dispatch({ type: GET_KITS_LOCATIONS_FAILURE, kitsLocationsError }),
    )
        .catch((kitsError) => {
            console.log('getKitsLocations: ', { ...kitsError });
            dispatch({ type: GET_KITS_LOCATIONS_FAILURE, kitsError });
        });
};

export const getKitsLocationsStart = () => ({
    type: GET_KITS_LOCATIONS_START,
});

export const getKitsLocationsSuccess = (kits) => ({
    type: GET_KITS_LOCATIONS_SUCCESS,
    payload: {
        ...kits,
    },
});

export const getKitsLocationsFailure = (error) => ({
    type: GET_KITS_LOCATIONS_FAILURE,
    payload: {
        error,
    },
});

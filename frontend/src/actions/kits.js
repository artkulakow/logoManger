import {KITS, FETCH_KITS} from './actionTypes.js'

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
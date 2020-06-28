import {KITS, FETCH_KITS, SELECTED_KIT} from './actionTypes.js'

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
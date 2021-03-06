import {
    KITS, FETCH_KITS, SELECTED_KIT,
    GET_KITS_START, GET_KITS_SUCCESS, GET_KITS_FAILURE,
    GET_KIT_DETAILS_FAILURE, GET_KIT_DETAILS_START, GET_KIT_DETAILS_SUCCESS, KIT_DETAILS,
    GET_KITS_THEMES_START, GET_KITS_THEMES_SUCCESS, GET_KITS_THEMES_FAILURE,
    GET_KITS_LOCATIONS_START, GET_KITS_LOCATIONS_SUCCESS, GET_KITS_LOCATIONS_FAILURE,
} from '../actions/actionTypes';

export default function kits(state = {}, action) {
    switch (action.type) {
    case KITS:
        return {
            ...state,
            kits: action.payload,
        };
    case FETCH_KITS:
        return {
            ...state,
            fetchKits: action.payload,
        };
    case SELECTED_KIT:
        return {
            ...state,
            selectedKit: action.payload,
        };

    case GET_KITS_START:
        return {
            ...state,
            kitsLoading: true,
        };
    case GET_KITS_SUCCESS:
        return {
            ...state,
            kitsLoading: false,
            kitsError: null,
            kits: action.kits.data.kits,
        };
    case GET_KITS_FAILURE:
        return {
            ...state,
            kitsLoading: false,
            kitsError: action.kitsError,
        };

    case KIT_DETAILS:
        return {
            ...state,
            kitsDetails: action.payload,
        };
    case GET_KIT_DETAILS_START:
        return {
            ...state,
            kitDetailsLoading: true,
        };
    case GET_KIT_DETAILS_SUCCESS:
        return {
            ...state,
            kitDetailsLoading: false,
            kitDetailsError: null,
            kitDetails: action.details.data.details,
        };
    case GET_KIT_DETAILS_FAILURE:
        return {
            ...state,
            kitDetiailsLoading: false,
            kitDetailsError: action.kitErrorError,
        };

    case GET_KITS_THEMES_START:
        return {
            ...state,
            kitsThemesLoading: true,
        };
    case GET_KITS_THEMES_SUCCESS:
        return {
            ...state,
            kitsThemesLoading: false,
            kitsThemesError: null,
            kitsThemes: action.kitsThemes.data.kitsThemes,
        };
    case GET_KITS_THEMES_FAILURE:
        return {
            ...state,
            kitsThemesLoading: false,
            kitsThemesError: action.kitsThemesError,
        };

    case GET_KITS_LOCATIONS_START:
        return {
            ...state,
            kitsLocationsLoading: true,
        };
    case GET_KITS_LOCATIONS_SUCCESS:
        return {
            ...state,
            kitsLocationsLoading: false,
            kitsLocationsError: null,
            kitsLocations: action.kitsLocations.data.kitsLocations,
        };
    case GET_KITS_LOCATIONS_FAILURE:
        return {
            ...state,
            kitsLocationsLoading: false,
            kitsLocationsError: action.kitsLocationsError,
        };
    default:
        return state;
    }
}

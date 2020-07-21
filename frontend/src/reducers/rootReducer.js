import {KITS, FETCH_KITS, SELECTED_KIT, 
        GET_KITS_START, GET_KITS_SUCCESS, GET_KITS_FAILURE,
        GET_KITS_THEMES_START, GET_KITS_THEMES_SUCCESS, GET_KITS_THEMES_FAILURE,
        GET_KITS_LOCATIONS_START, GET_KITS_LOCATIONS_SUCCESS, GET_KITS_LOCATIONS_FAILURE,
    } from '../actions/actionTypes';
import { bindActionCreators } from 'redux';

export default (state, action) => {
    switch (action.type) {
        case KITS:
            return {
                ...state,
                kits: action.payload,
            }
        case FETCH_KITS:
            return {
                ...state,
                fetchKits: action.payload,
            }
        case SELECTED_KIT:
            return {
                ...state,
                selectedKit: action.payload,
            }

        case GET_KITS_START:
            return {
                ...StaticRange,
                kitsLoading: true,
            }
        case GET_KITS_SUCCESS:
            return {
                ...state,
                kitsLoading: false,
                kitsError: null,
                kits: action.kits.data.kits
            }
        case GET_KITS_FAILURE:
            console.log('reducers => getKits: ', {...action.kitsError})
            return {
                ...state,
                kitsLoading: false,
                kitsError: action.kitsError,
            }

        case GET_KITS_THEMES_START:
            return {
                ...StaticRange,
                kitsThemesLoading: true,
            }
        case GET_KITS_THEMES_SUCCESS:
            return {
                ...state,
                kitsThemesLoading: false,
                kitsThemesError: null,
                kitsThemes: action.kitsThemes.data.kitsThemes
            }
        case GET_KITS_THEMES_FAILURE:
            return {
                ...state,
                kitsThemesLoading: false,
                kitsThemesError: action.kitsThemesError,
            }

        case GET_KITS_LOCATIONS_START:
            return {
                ...StaticRange,
                kitsLocationsLoading: true,
            }
        case GET_KITS_LOCATIONS_SUCCESS:
            return {
                ...state,
                kitsLocationsLoading: false,
                kitsLocationsError: null,
                kitsLocations: action.kitsLocations.data.kitsLocations
            }
        case GET_KITS_LOCATIONS_FAILURE:
            return {
                ...state,
                kitsLocationsLoading: false,
                kitsLocationsError: action.kitsLocationsError,
            }
        default:
            return state;
    }
}
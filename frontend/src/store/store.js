import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import reducer from "../reducers/index";

function configureStore(state = {
    kits: {
        kits: [],
        fetchKits: false,
        selectedKit: -1,
        kitsLoading: false,
        kitsError: null,
        kitDetails: [],
        kitDetailsLoading: false,
        kitDetailsError: null,
        kitsThemes: [],
        kitsThemesLoading: false,
        kitsThemesError: null,
        kitsLocations: [],
        kitsLocationsLoading: false,
        kitsLocationsError: null,
    },

    admin: {
        adminUnits: 'standard',
    }
}) {

    const stores = createStore(reducer, state, applyMiddleware(thunk));

    window.stores = stores;

    return stores;
}

export default configureStore;
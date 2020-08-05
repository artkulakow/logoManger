import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "../reducers/rootReducer";

function configureStore(state = {
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
}) {
    const stores = createStore(rootReducer, state, applyMiddleware(thunk));

    window.stores = stores;

    return stores;
}

export default configureStore;
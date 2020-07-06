import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import rootReducer from "../reducers/rootReducer";

function configureStore(state = {
    kits: [], 
    fetchKits: false,
    selectedKit: -1,
    kitsLoading: false,
    kitsError: null,
    kitsThemes: [],
    kitsThemesLoading: false,
    kitsThemesError: null,
    kitsLocations: [],
    kitsLocationsLoading: false,
    kitsLocationsError: null,
})
{
    return createStore(rootReducer, state, applyMiddleware(thunk));
}

export default configureStore;
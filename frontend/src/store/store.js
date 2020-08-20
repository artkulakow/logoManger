import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';

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

        adminUserId: -1,

        adminUser: null,
        adminUserLoading: false,
        adminUserError: null,

        adminModifyUserLoading: false,
        adminModifyUserError: null,
        adminModifyUserSuccess: false,

        adminCreateUserLoading: false,
        adminCreateUserError: null,
    },
}) {
    const stores = createStore(reducer, state, applyMiddleware(thunk));

    // eslint-disable-next-line no-undef
    window.stores = stores;

    return stores;
}

export default configureStore;

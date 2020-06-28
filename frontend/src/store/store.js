import {createStore} from "redux";
import rootReducer from "../reducers/rootReducer";

function configureStore(state = {
    kits: [], 
    fetchKits: false,
    selectedKit: -1,
})
{
    return createStore(rootReducer, state);
}

export default configureStore;
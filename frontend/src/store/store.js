import {createStore} from "redux";
import rootReducer from "../reducers/rootReducer";

function configureStore(state = {
    kits: [], 
    fetchKits: false
})
{
    return createStore(rootReducer, state);
}

export default configureStore;
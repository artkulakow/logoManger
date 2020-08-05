import { combineReducers } from 'redux'

import kits from './kitsReducer';
import admin from './adminReducer';

export default combineReducers({
    kits,
    admin,
})
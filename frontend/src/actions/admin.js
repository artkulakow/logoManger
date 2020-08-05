import {ADMIN_UNITS} from './actionTypes.js'
import axios from 'axios';

export const setUnits = (payload) => {
return {
    type: ADMIN_UNITS,
    payload
}
};

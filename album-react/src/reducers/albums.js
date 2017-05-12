import Immutable from 'immutable';

import {
    GET_ALBUMS_SUCCESS,
    GET_ALBUMS_FAILURE
} from '../constants/albums.js'

const initialState = Immutable.Map();

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALBUMS_FAILURE: {
            return state.clear();
        }
        case GET_ALBUMS_SUCCESS: {
            return state.merge({list: action.albums});
        }
        default:
            return state;
    }
}
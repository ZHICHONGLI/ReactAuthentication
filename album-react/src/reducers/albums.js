import Immutable from 'immutable';

import {
    GET_ALBUMS_SUCCESS,
    GET_ALBUMS_FAILURE,
    SET_SEARCH_BAR
} from '../constants/albums'

const initialState = Immutable.Map();

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_ALBUMS_FAILURE: {
            return state.clear();
        }
        case GET_ALBUMS_SUCCESS: {
            return state.merge({list: action.albums});
        }
        case SET_SEARCH_BAR: {
            return state.merge({ searchBar: action.keyword });
        }
        default:
            return state;
    }
}
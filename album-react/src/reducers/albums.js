import Immutable from 'immutable';

import {
    GET_ALBUMS_SUCCESS,
    GET_ALBUMS_FAILURE,
    SET_SEARCH_BAR,
    SHOW_SELECTED_ALBUM,
    DELETE_ALBUM_FAILURE,
    DELETE_ALBUM_SUCCESS
} from '../constants/albums'

const initialState = Immutable.Map();

export default (state = initialState, action) => {
    switch (action.type) {
        // BOTH cases share the same behavior
        case DELETE_ALBUM_FAILURE:
        case GET_ALBUMS_FAILURE: {
            return state.clear();
        }
        // BOTH cases share the same behavior
        case DELETE_ALBUM_SUCCESS:
        case GET_ALBUMS_SUCCESS: {
            return state.merge({list: action.albums});
        }
        case SET_SEARCH_BAR: {
            return state.merge({ searchBar: action.keyword });
        }
        case SHOW_SELECTED_ALBUM: {
            return state.merge({ selectedAlbum: action.album });
        }
        default:
            return state;
    }
}
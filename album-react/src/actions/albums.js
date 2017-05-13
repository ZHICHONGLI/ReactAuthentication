import {
    GET_ALBUMS,
    GET_ALBUMS_SUCCESS,
    GET_ALBUMS_FAILURE,
    SET_SEARCH_BAR,
    SHOW_SELECTED_ALBUM
} from '../constants/albums';

function getAblums () {
    return {
        type: GET_ALBUMS
    }
};

function getAblumsSuccess (albums) {
    return {
        type: GET_ALBUMS_SUCCESS,
        albums
    }
}

function getAblumsFailure () {
    return {
        type: GET_ALBUMS_FAILURE
    }
}

function setSearchBar (keyword) {
    return {
        type: SET_SEARCH_BAR,
        keyword
    };
}

function showSelectedAlbum (album) {
    return {
        type: SHOW_SELECTED_ALBUM,
        album
    };
}

export {
    getAblums,
    getAblumsSuccess,
    getAblumsFailure,
    setSearchBar,
    showSelectedAlbum
}
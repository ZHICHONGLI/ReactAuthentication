import {
    GET_ALBUMS,
    GET_ALBUMS_SUCCESS,
    GET_ALBUMS_FAILURE,
    SET_SEARCH_BAR,
    SHOW_SELECTED_ALBUM,
    DELETE_ALBUM,
    DELETE_ALBUM_SUCCESS,
    DELETE_ALBUM_FAILURE
} from '../constants/albums';

function getAlbums () {
    return {
        type: GET_ALBUMS
    }
};

function getAblumsSuccess (albums) {
    return {
        type: GET_ALBUMS_SUCCESS,
        albums
    };
}

function getAblumsFailure () {
    return {
        type: GET_ALBUMS_FAILURE
    };
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

function deleteAlbum () {
    return {
        type: DELETE_ALBUM
    };
}

function deleteAlbumSuccess (albums) {
    return {
        type: DELETE_ALBUM_SUCCESS,
        albums
    };
}

function deleteAlbumFailure () {
    return {
        type: DELETE_ALBUM_FAILURE
    };
}

export {
    getAlbums,
    getAblumsSuccess,
    getAblumsFailure,
    setSearchBar,
    showSelectedAlbum,
    deleteAlbum,
    deleteAlbumFailure,
    deleteAlbumSuccess
};
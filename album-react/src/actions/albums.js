import {
    GET_ALBUMS,
    GET_ALBUMS_SUCCESS,
    GET_ALBUMS_FAILURE,
    SET_SEARCH_BAR
} from '../constants/albums';

function getAblums () {
    return {
        type: GET_ALBUMS
    }
};

function getAblumsSuccess () {
    return {
        type: GET_ALBUMS_SUCCESS
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

export {
    getAblums,
    getAblumsSuccess,
    getAblumsFailure
}
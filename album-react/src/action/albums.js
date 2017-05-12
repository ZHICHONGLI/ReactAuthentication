import {
    GET_ALBUMS,
    GET_ALBUMS_SUCCESS,
    GET_ALBUMS_FAILURE
} from '../constants/games';

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

export {
    getAblums,
    getAblumsSuccess,
    getAblumsFailure
}
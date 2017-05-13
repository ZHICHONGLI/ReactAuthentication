import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { GET_ALBUMS } from '../constants/albums';
import { getAlbumsSuccess, getAlbumsFailure } from '../actions/albums';

const fetchAlbums = () => {
    return fetch('http://localhost:4300/albums', {
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(response => response.json())
};

// yield call to fetchAlbums is in a try catch to control the flow even when the promise rejects
function* getAlbums () {
    try {
        const albums = yield call(fetchAlbums);
        yield put(getAlbumsSuccess(albums));
    } catch (err) {
        yield put(getAlbumsFailure());
    }
}

// The watcher saga waits for dispatched GET_ALBUMS actions
function* watchGetAlbums () {
    yield takeLatest(GET_ALBUMS, getAlbums);
}

// export the watcher to be run in parallel in sages/index.js

export {
    watchGetAlbums
}
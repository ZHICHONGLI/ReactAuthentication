import { takeLatest, delay } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import { GET_ALBUMS, DELETE_ALBUM } from '../constants/albums';
import { getAlbumsSuccess,
         getAlbumsFailure,
         deleteAlbumFailure,
         deleteAlbumSuccess
    } from '../actions/albums';

const selectedAlbums = (state) => {
    return state.getIn(['albums', 'list']).toJS();
}

const fetchAlbums = () => {
    return fetch('http://localhost:4300/albums', {
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(response => response.json())
};

const deleteServerAlbum = (id) => {
    return fetch(`http://localhost:4300/alnums/${id}`, {
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        method: 'DELETE',
    })
    .then(response => response.json());
}

// yield call to fetchAlbums is in a try catch to control the flow even when the promise rejects
function* getAlbums () {
    try {
        const albums = yield call(fetchAlbums);
        yield put(getAlbumsSuccess(albums));
    } catch (err) {
        yield put(getAlbumsFailure());
    }
}

function* deleteAlbum (action) {
    const { id } = action;

    const albums = yield select(selectedAlbums);
    try {
        yield call(deleteServerAlbum, id);
        // New state will contain the albums except for the deleted one
        yield put(deleteAlbumSuccess(albums.filter(album => album._id !== id)));
    } catch (e) {
        // error handling
        yield put(deleteAlbumFailure());
    }
}

// The watcher saga waits for dispatched GET_ALBUMS actions
function* watchGetAlbums () {
    yield takeLatest(GET_ALBUMS, getAlbums);
}

function* watchDeleteAlbum () {
    yield takeLatest(DELETE_ALBUM, deleteAlbum);
}

// export the watcher to be run in parallel in sages/index.js

export {
    watchGetAlbums,
    watchDeleteAlbum
}
import { watchGetAlbums,
         watchDeleteAlbum
    } from './albums';

export default function* rootSaga () {
// Start all the sagas in parallel
    yield [
        watchGetAlbums(),
        watchDeleteAlbum() // must be run in parallel
    ];
}
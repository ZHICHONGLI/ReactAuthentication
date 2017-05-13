import { watchGetAlbums } from './albums';

export default function* rootSaga () {
// Start all the sagas in parallel
    yield [
        watchGetAlbums()
    ];
}
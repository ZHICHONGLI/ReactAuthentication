import { watchGetAlbums,
         watchDeleteAlbum,
         watchPostAlbum
    } from './albums';

import { watchLoginUser, watchSignupUser } from './auth';

export default function* rootSaga () {
// Start all the sagas in parallel
    yield [
        watchGetAlbums(),
        watchDeleteAlbum(), // must be run in parallel
        watchPostAlbum(),
        watchLoginUser(),
        watchSignupUser()
    ];
}
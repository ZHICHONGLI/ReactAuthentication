import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';
import albums from './albums';
import auth from './auth';

import routing from './routing';
import { reducer as toastr } from 'react-redux-toastr';

export default combineReducers({
    albums,
    form,
    routing,
    auth,
    toastr
});
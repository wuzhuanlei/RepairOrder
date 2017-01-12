import Immutable from 'immutable';
import {combineReducers} from 'redux-immutable';
import {SET_VISIBILITY} from '../actions/actions';


const createEmptyState = state => state === undefined || state === null ? Immutable.Map() : state;

const page = (state, action) => {
    state = createEmptyState(state);

    switch(action.type) {
        case SET_VISIBILITY:
            if(action.visibility) {
                state = state.set('route', action.visibility);
                state = state.set('routeParameters', Immutable.fromJS(action.parameters));
            } else {
                state = state.delete('route');
                state = state.delete('routeParameters');
            }

            return state;
    }
    return state;
};
export default (combineReducers({
    page
}));

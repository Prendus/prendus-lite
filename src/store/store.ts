import {createStore} from 'redux';
import {State, Action} from '../prendus-lite.d';

const InitialState = {

};

const RootReducer = (state: State = InitialState, action: Action) => {
    return state;
};

export const Store = createStore(RootReducer);

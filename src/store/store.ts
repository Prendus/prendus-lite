import {createStore} from 'redux';

const InitialState = {

};

const RootReducer = (state = InitialState, action) => {
    return state;
};

export const Store = createStore(RootReducer);

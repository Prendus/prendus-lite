import {createStore} from 'redux';
import {
    State,
    Action
} from '../prendus-lite.d';

const InitialState: State = {
    components: {}
};

export const RootReducer = (state: State = InitialState, action: Action) => {
    if (action.type === 'SET_COMPONENT_STATE') {
        return {
            ...state,
            components: {
                ...state.components,
                [action.componentId]: {
                    [action.key]: action.value
                }
            }
        };
    }

    return state;
};

export const Store = createStore(RootReducer);

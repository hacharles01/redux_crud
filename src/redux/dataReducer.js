import { defaultState } from "../state/state";
import { types } from "../actions/actionType";

// Reducer for loading state
const loading = (loadingState = defaultState, action) => {
    switch (action.type) {
        case types.FETCH_DATA_REQUEST:
        case types.ADD_DATA_REQUEST:
        case types.UPDATE_DATA_REQUEST:
        case types.DELETE_DATA_REQUEST:
            return true;

        case types.FETCH_DATA_SUCC:
        case types.FETCH_DATA_FAILURE:
        case types.ADD_DATA_SUCC:
        case types.ADD_DATA_FAILURE:
        case types.UPDATE_DATA_SUCC:
        case types.UPDATE_DATA_FAILURE:
        case types.DELETE_DATA_SUCC:
        case types.DELETE_DATA_FAILURE:
            return false;

        default:
            return loadingState;
    }
}

// Reducer for error state
const error = (errorState = defaultState, action) => {
    switch (action.type) {
        case types.FETCH_DATA_FAILURE:
        case types.ADD_DATA_FAILURE:
        case types.UPDATE_DATA_FAILURE:
        case types.DELETE_DATA_FAILURE:
            return true;

        case types.FETCH_DATA_REQUEST:
        case types.FETCH_DATA_SUCC:
        case types.ADD_DATA_REQUEST:
        case types.ADD_DATA_SUCC:
        case types.UPDATE_DATA_REQUEST:
        case types.UPDATE_DATA_SUCC:
        case types.DELETE_DATA_REQUEST:
        case types.DELETE_DATA_SUCC:
            return null;

        default:
            return errorState;
    }
}

// Reducer for data state
const data = (dataState = defaultState.data, action) => {
    switch (action.type) {
        case types.FETCH_DATA_SUCC:
            return action.payload;
        case types.ADD_DATA_SUCC:
            return [...dataState, action.payload];
        case types.UPDATE_DATA_SUCC:
            return dataState.map((item) => {
                return item.id === action.payload.id ? { ...item, ...action.payload } : item;
            });
        case types.DELETE_DATA_SUCC:
            return dataState.filter((item) => item.id !== action.payload);

        default:
            return dataState;
    }
};

// export { data };
export { loading, error, data };

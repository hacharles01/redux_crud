import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk'; // Correct the import statement for Redux Thunk
import { loading, error, data } from '../redux/dataReducer'; // Correct the import path and names for reducers

const rootReducer = combineReducers({
  company: combineReducers({ // Combine reducers directly within combineReducers
    loading,
    error,
    data,
  })
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

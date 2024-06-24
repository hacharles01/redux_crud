import axios from 'axios';
import { types } from './actionType';
import { type } from '@testing-library/user-event/dist/type';

export const fetchData = () => {
    return async (dispatch) => {
        dispatch({ type: types.FETCH_DATA_REQUEST });
        try {
            const { data } = await axios.get('http://localhost:8000/companies');
            console.log('Fetched data:', data); // Log the fetched data
            dispatch({ type: types.FETCH_DATA_SUCC, payload: data });
        } catch (error) {
            console.error('Error fetching data:', error); // Log any errors
            dispatch({ type: types.FETCH_DATA_FAILURE, payload: error.message });
        }
    };
};


export const addData = (newData) => {
    return async (dispatch) => {
        dispatch({ type: types.ADD_DATA_REQUEST });
        try {
            const response = await axios.post('http://localhost:8000/companies',newData);
            dispatch({ type: types.ADD_DATA_SUCC, payload: response.data });

        } catch (error) {
            dispatch({ type: types.ADD_DATA_FAILURE, payload: error.message });
        }
    }
}

export const updateData = (updatedData) => {
    return async (dispatch) => {
        dispatch({ type: types.UPDATE_DATA_REQUEST });
        try {
            const response = await axios.put(`http://localhost:8000/companies/${updatedData.id}`,updatedData);
            dispatch({ type: types.UPDATE_DATA_SUCC, payload: response.data });
        } catch (error) {
            dispatch({ type: types.UPDATE_DATA_FAILURE, payload: error.message });
        }
    }
}

export const deleteData = (id) => {
    return async (dispatch) => {
        dispatch({ type: types.DELETE_DATA_REQUEST });
        try {
            await axios.delete(`http://localhost:8000/companies/${id}`);
            dispatch({ type: types.DELETE_DATA_SUCC, payload: id });
        } catch (error) {
            dispatch({ type: types.DELETE_DATA_FAILURE });
        }
    };
};

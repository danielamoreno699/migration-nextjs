
import appApi from "../../api/authApi"
import {  pending, fulfilled, rejected, deleteUserSuccess} from "./"


// function that displays all users 
export const getAllUsers = () => {
    return async (dispatch) => {
        dispatch(pending());
    
        try {
            const response = await appApi.get('/users')
          
            dispatch(fulfilled(response.data));
        } catch (error) {
            dispatch(rejected(error.response) || '');          
        }
        
      };
}

// update user info
export const updateUser = (id, data) => {
    return async (dispatch) => {
        dispatch(pending());
    
        try {
            const response = await appApi.put(`/users/${id}`, data)
       
            dispatch(fulfilled(response.data));
        } catch (error) {
            dispatch(rejected(error.response) || '');          
        }
        
      };
}

//delete user
export const deleteUser = (id) => {
    return async (dispatch) => {
        dispatch(pending());
    
        try {
            const response = await appApi.delete(`/users/${id}`)
           
            dispatch(deleteUserSuccess(response.data));
        } catch (error) {
            dispatch(rejected(error.response) || '');          
        }
        
      };
}

// create user
export const createUserAdmin = (data) => {
    return async (dispatch) => {
        dispatch(pending());
    
        try {
            const response = await appApi.post('/users', data)
           
            return response.data;
        } catch (error) {
            dispatch(rejected(error.response) || '');          
        }
        
      };
}
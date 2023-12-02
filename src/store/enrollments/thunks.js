import appApi from "../../api/authApi"
import {  pending, fulfilled, rejected, fulfilledEnrollment} from "./"

//get All enrollments for Admin
export const getAllEnrollmentsUsers = () => {
    return async (dispatch) => {
        dispatch(pending());
    
        try {
            const response = await appApi.get('/enrollments/users')
           
            dispatch(fulfilled(response.data));
            
            return response.data;
        } catch (error) {
            dispatch(rejected(error.response) || '');          
        }
        
      };
}


//get enrollment by id
export const getEnrollmentById = (id) => {
    return async (dispatch) => {
        dispatch(pending());
    
        try {
            const response = await appApi.get(`/enrollments/${id}`)
          
           
           
            dispatch(fulfilledEnrollment(response.data));
            return response.data;
        } catch (error) {
            dispatch(rejected(error.response) || '');          
        }
        
      };
}

// update enrollment
export const updateEnrollment = (id, data) => {
    return async (dispatch) => {
        dispatch(pending());
    
        try {
            const response = await appApi.put(`/enrollments/${id}`, data)
           
        
            return response.data;
        } catch (error) {
            dispatch(rejected(error.response) || '');          
        }
        
      };
}

//create enrollment
export const createEnrollment = (data) => {
    return async (dispatch) => {
        dispatch(pending());
    
        try {
            const response = await appApi.post('/enrollments', data)
           
            console.log('api create enrollment', response.data)
            return response.data;
        } catch (error) {
            dispatch(rejected(error.response) || '');          
        }
        
      };
}

//delete enrollment
export const deleteEnrollment = (id) => {
    return async (dispatch) => {
        dispatch(pending());
    
        try {
            const response = await appApi.delete(`/enrollments/${id}`)
           
        
            return response.data;
        } catch (error) {
            dispatch(rejected(error.response) || '');          
        }
        
      };
}

//get enrollments by user role 
export const getEnrollmentsByUserId = (userId) => {
    return async (dispatch) => {
        dispatch(pending());
    
        try {
            const response = await appApi.get(`/enrollments/${userId}/user-details`)
           console.log('response api get enrollments by id', response.data)
           dispatch(fulfilled(response.data.data));
            return response.data;
        } catch (error) {
            dispatch(rejected(error.response) || '');          
        }
        
      };
}
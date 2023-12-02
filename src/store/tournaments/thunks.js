import appApi from "../../api/authApi"
import {  pending, fulfilled, rejected, fulfilledTournament} from "./"


//get tournaments
export const getTournaments = () => {
    return async (dispatch) => {
        dispatch(pending());
    
        try {
            const response = await appApi.get('/tournaments')
            console.log('response-t', response.data)
            
            dispatch(fulfilled(response.data));
        } catch (error) {
            dispatch(rejected(error.response) || '');          
        }
        
      };
}

//get tournament by id
export const getTournamentById = (id) => {
    return async (dispatch) => {
        dispatch(pending());
    
        try {
            const response = await appApi.get(`/tournaments/${id}`)
          
            dispatch(fulfilledTournament(response.data));
        } catch (error) {
            dispatch(rejected(error.response) || '');          
        }
        
      };
}

// update tournament
export const updateTournament = (id, data) => {
    return async (dispatch) => {
        dispatch(pending());
    
        try {
            const response = await appApi.put(`/tournaments/${id}`, data)
           
            
            return response.data;
        } catch (error) {
            dispatch(rejected(error.response) || '');          
        }
        
      };
}

// delete tournament
export const deleteTournament = (id) => {
    return async (dispatch) => {
        dispatch(pending());
    
        try {
            const response = await appApi.delete(`/tournaments/${id}`)    
            return response.data;
        } catch (error) {
            dispatch(rejected(error.response) || '');          
        }
        
      };
}


// create tournament
export const createTournament = (data) => {
    return async (dispatch) => {
        dispatch(pending());
    
        try {
            const response = await appApi.post(`/tournaments`, data)
           
            
            return response.data;
        } catch (error) {
            dispatch(rejected(error.response) || '');          
        }
        
      };
}
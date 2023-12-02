
import appApi from "../../api/authApi"
import { onChecking, onLogin, onLogout, clearErrorMessage} from "./";


//create new user
    export const CreateNewUser = (data) => {
      return async (dispatch) => {
        dispatch(onChecking());
    
        try {
           await appApi.post(
            '/register',
            data,
          );
    
          dispatch(onLogin({ _id: data._id, email: data.email, role: data.role }));
          return data
        } catch (error) {
          dispatch(onLogout(error.response.data?.message) || '');
          setTimeout(() => {
            dispatch(clearErrorMessage());
          }, 10);
        }
      };
    };


    //login user
    export const loginUser = (data) => {
      return async (dispatch) => {
        dispatch(onChecking());
    
        try {
          const response = await appApi.post(
            '/login',
            data,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          
          const user = response.data['user']
          // console.log(response.data)
          // console.log('user', response.data['user'])

          localStorage.setItem('token', response.data['data']);
          localStorage.setItem('token-start-date', new Date().getTime());
          localStorage.setItem('user', JSON.stringify(user));
          dispatch(onLogin({ _id: user._id, email: user.email, role: user.role }));
          return response.data;
        } catch (error) {
          dispatch(onLogout(error.response.data?.message) || '');
          setTimeout(() => {
            dispatch(clearErrorMessage());
          }, 10);
        }
      };
    };



// persistLogin action

export const persistLogin = (userId) => {
  return async (dispatch) => {
    dispatch(onChecking());

    try {
      
      const response = await appApi.get(`/session/${userId}`); 
      const user = response.data.data; 

      console.log('userpersist', user);

      dispatch(onLogin({
        _id: user._id,
        email: user.email,
        role: user.role,
      
      }));
    } catch (error) {
      dispatch(onLogout(error.response) || '');
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
};

// logout

export const logout = () => {

  return async (dispatch) => {
    dispatch(onChecking());

    try {
    
      localStorage.removeItem('token');
      localStorage.removeItem('token-start-date');
      localStorage.removeItem('user');
      dispatch(onLogout());
    } catch (error) {
      dispatch(onLogout(error.response) || '');
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };
}

  




import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const initialState = {
    data: null,
    loading: false,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_USER_DATA_REQUEST':
        return { ...state, loading: true, error: null };
      case 'FETCH_USER_DATA_SUCCESS':
        return { ...state, loading: false, data: action.payload };
      case 'FETCH_USER_DATA_FAILURE':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };


/* Initially i was using this code and getting a pending promise as a result : 
✅ because the result wasn't available at the time of printing..
async function getUserData(value){
          const data = await fetch(`https://api.github.com/users/${value}`)
          console.log(data.json())
    }
   
    ✅ correct code :- 

async function getUserData(value){
    const response = await fetch(`https://api.github.com/users/${value}`)
    const data = await response.json()
    console.log(data)
} 
*/ 

    const fetchUserData = (value) => {
    return async (dispatch,getState) => {
      // Simulate an API call (replace with your actual API endpoint)
        dispatch(fetchUserDataRequest())
        try{
         const response = await fetch(`https://api.github.com/users/${value}`)
         if(!response.ok){
            throw new error ("error in network request")
         }
         const data = await response.json()
         dispatch(fetchUserDataSuccess(data.name))
        }catch(e){
            dispatch(fetchUserDataFailure(e))
        }         
  };
} 

// action creators :- 

 const fetchUserDataRequest = () => ({
    type: 'FETCH_USER_DATA_REQUEST',
  });
  
   const fetchUserDataSuccess = (data) => ({
    type: 'FETCH_USER_DATA_SUCCESS',
    payload: data,
  });
  
   const fetchUserDataFailure = (error) => ({
    type: 'FETCH_USER_DATA_FAILURE',
    payload: error,
  });

// Create the store with thunk middleware
const store = createStore(userReducer, initialState, applyMiddleware(thunk.default,logger.default));

// Dispatch the action by calling it and passing the value
store.dispatch(fetchUserData("NileshJain82"));

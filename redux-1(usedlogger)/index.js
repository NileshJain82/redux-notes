import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";

const inc = "inc"
const dec = "dec"
const mul = "mul"
const div = "div"

// creating the reducer which will take the value form the user in the function itself ;

const reducer = (state={value:10},action) => {

    switch(action.type){ 
        
        case inc:
            return {value:state.value+action.value}
        case dec:
            return {value:state.value-action.value}
        case mul:
            return {value:state.value*action.value}
        case div:
            return {value:state.value/action.value}
        default :
            return state    
    }
}


//using the middleware logger for showing the details of the prev state action and nextstate

const store = createStore(reducer,applyMiddleware(logger.default))

function increment(value){
    return{
        type:inc,
        value
    }
}

function decrement(value){
    return{
        type:dec,
        value
    }
}

function multiply(value){
    return{
        type:mul,
        value
    }
}

function divide(value){
    return{
        type:div,
        value
    }
}

store.dispatch(increment(10))
store.dispatch(decrement(2))
store.dispatch(multiply(8))
store.dispatch(divide(10))
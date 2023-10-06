import { createStore } from "redux";

/* Three principles of the redux :- 

1. Single Source of Truth :- 

Redux maintains the application state in a single JavaScript object called the "store." This store represents the entire state of your application. Having a single source of truth makes it easier to manage and reason about the application's state because all data is centralized in one place.

2. State is Read-Only:-

In Redux, the state is immutable and cannot be changed directly. The only way to modify the state is by dispatching actions. Actions are plain JavaScript objects that describe what happened in the application. Reducers, which are pure functions, specify how the state should change in response to actions. This immutability and the use of pure functions make state changes predictable and traceable.

3. Changes are Made with Pure Functions:-

Redux uses pure reducer functions to specify how the state should change in response to actions. These reducer functions take the current state and an action as input and return a new state object without modifying the existing state. This predictability and purity of reducer functions ensure that the application's behavior is easy to understand and test.

*/


// adding constats so that the consfusion isn't there while checking

const inc = "inc"
const dec = "dec"
const mul = "mul"
const div = "div"

/* creating a reducer it will create a new object and return the values from there now changing the state directly and will take bydefault perform the task with hard coded value.(by 1 and 2 only)

* Here we will get the object in output.

const reducer = (state={value:10},action) => {

    switch(action.type){
        case inc:
            return {value:state.value+1}
        case dec:
            return {value:state.value-1}
        case mul:
            return {value:state.value*2}
        case div:
            return {value:state.value/2}
        default :
            return state    
    }
}

*/

/* creating a reducer it will change the state directly which is not a best practise. Here we will get the value not the object


const reducer = (value=10,action) => {

    switch(action.type){
        case inc:
            return value+1
        case dec:
            return value-1
        case mul:
            return value*2
        case div:
            return value/2
        default :
            return value    
    }
}

*/

// creating the reducer which will take the value form the user in the function itself ;

const reducer = (state={value:10},action) => {

    switch(action.type){
       
        // use action.value or use action.payload and use payload:value in the function 

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


// creating the store...btw the createStrore is deprecated but just using for the learning purpose.

const store = createStore(reducer)


// These are action creators :


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

// using the subsribe method for getting the changes in the store. The primary purpose of store.subscribe() is to update the user interface (UI) in response to changes in the application's state.

store.subscribe(()=>{
    console.log("store changed")
    console.log(store.getState())
})

// Sending the dispatcher for doing some functionality.

store.dispatch(increment(10))
store.dispatch(decrement(2))
store.dispatch(multiply(8))
store.dispatch(divide(10))
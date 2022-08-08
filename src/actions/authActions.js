import { SET_CURRENT_USER } from './types'

// user authentication
export function setCurrentUser(user){
    console.log("In auth action", user);
    return {
        type : SET_CURRENT_USER,
        user : user
    };
}

export function SignOut(){
    return {
        type : 'USER_LOGOUT'
    };
}
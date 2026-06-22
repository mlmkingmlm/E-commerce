import { GET_USERS, UPDATE_USERS } from "../Constants";


export function getUsers(){
    console.log("data")
    return {
        type: GET_USERS
    }
}

export function updateUser({data, id}){
    return{
        type:UPDATE_USERS,
        payload:data,
        id:id
    }
}
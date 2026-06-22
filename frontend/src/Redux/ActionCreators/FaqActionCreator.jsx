import { CREATE_FAQ, DELETE_FAQ, GET_FAQ, UPDATE_FAQ } from "../Constants";

export function createFaq(data){
    console.log(data)
    return{
        type:CREATE_FAQ,
        payload:data
    }
};

export function getFaq(){
    return{
        type:GET_FAQ
    }
};

export function updateFaq({data, id}){
    return{
        type:UPDATE_FAQ,
        payload:data,
        id:id
    }
}

export function deleteFaq(data){
    return{
        type:DELETE_FAQ,
        payload:data
    }
}
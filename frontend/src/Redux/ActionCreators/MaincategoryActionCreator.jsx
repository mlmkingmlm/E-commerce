import { CREATE_MAINCATEGORY, DELETE_MAINCATEGORY, GET_MAINCATEGORY, UPDATE_MAINCATEGORY } from "../Constants";

export function createMaincategory(data){
    return{
        type:CREATE_MAINCATEGORY,
        payload:data,
        
    }
};

export function getMaincategory(){
    return{
        type:GET_MAINCATEGORY
    }
};

export function updateMaincategory({data,id}){
    return{
        type:UPDATE_MAINCATEGORY,
        payload:data,
        id:id
    }
}

export function deleteMaincategory(data){
    console.log(data)
    return{
        type:DELETE_MAINCATEGORY,
        payload:data
    }
}
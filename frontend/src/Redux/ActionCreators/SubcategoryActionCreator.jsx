import { CREATE_SUBCATEGORY, DELETE_SUBCATEGORY, GET_SUBCATEGORY, UPDATE_SUBCATEGORY } from "../Constants";

export function createSubcategory(data){
    console.log(data)
    return{
        type:CREATE_SUBCATEGORY,
        payload:data
    }
};

export function getSubcategory(){
    return{
        type:GET_SUBCATEGORY
    }
};

export function updateSubcategory({data, id}){
    console.log(id)
    return{
        type:UPDATE_SUBCATEGORY,
        payload:data,
        id:id
    }
}

export function deleteSubcategory(data){
    console.log(data)
    return{
        type:DELETE_SUBCATEGORY,
        payload:data
    }
}
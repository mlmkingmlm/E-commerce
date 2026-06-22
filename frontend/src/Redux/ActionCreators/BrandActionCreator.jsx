import { CREATE_BRAND, DELETE_BRAND, GET_BRAND, UPDATE_BRAND } from "../Constants";

export function createBrand(data){
    return{
        type:CREATE_BRAND,
        payload:data
    }
};

export function getBrand(){
    return{
        type:GET_BRAND
    }
};

export function updateBrand({data, id}){
    return{
        type:UPDATE_BRAND,
        payload:data,
        id:id
    }
}

export function deleteBrand(data){
    return{
        type:DELETE_BRAND,
        payload:data
    }
}
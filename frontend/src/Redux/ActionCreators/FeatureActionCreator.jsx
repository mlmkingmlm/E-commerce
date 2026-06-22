import { CREATE_FEATURE, DELETE_FEATURE, GET_FEATURE, UPDATE_FEATURE } from "../Constants";

export function createFeature(data){
    return{
        type:CREATE_FEATURE,
        payload:data
    }
};

export function getFeature(){
    return{
        type:GET_FEATURE
    }
};

export function updateFeature({data, id}){
    return{
        type:UPDATE_FEATURE,
        payload:data,
        id:id
    }
}

export function deleteFeature(data){
    return{
        type:DELETE_FEATURE,
        payload:data
    }
}
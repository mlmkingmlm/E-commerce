import { act } from "react";
import { CREATE_ADDRESS_FAIL, CREATE_ADDRESS_RED, GET_ADDRESS_RED, UPDATE_ADDRESS_FAIL, UPDATE_ADDRESS_RED } from "../Constants";

const initialState = {
    data: [],
    loading: false,
    error: null,
    actionStatus: null,
    message: null
}

export function addressReducer(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case CREATE_ADDRESS_RED:
            return {
                ...state,
                success: true,
                message: action.message,
                data: [...state.data, action.payload]
            }

        case CREATE_ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };

        case GET_ADDRESS_RED:
            return {
                ...state,
                data: action.payload
            }

        case UPDATE_ADDRESS_RED:
            return {
                ...state,
                loading: false,
                success: true,
                data: state.data.map(item =>
                    item._id === action.payload._id ? action.payload : item
                ),
                message: action.message
            }

        case UPDATE_ADDRESS_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };

        default:
            return state
    }
}
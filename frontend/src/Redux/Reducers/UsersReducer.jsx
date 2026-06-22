import { data } from "react-router-dom";
import { GET_USERS_RED, UPDATE_USERS_RED, UPDATE_USERS_FAIL } from "../Constants";

const initialState = {
    data: [],
    loading: false,
    error: null,
    actionStatus: null,
    message: null
}

export function userReducer(state = initialState, action) {
    console.log(action.payload)
    switch (action.type) {
        case GET_USERS_RED:
            return {
                ...state,
                data: action.payload
            }
        case UPDATE_USERS_RED:
            return {
                ...state,
                loading: false,
                success: true,
                data: state.data.map(item =>
                    item._id === action.payload._id ? action.payload : item
                ),
                message: action.message
            }

        case UPDATE_USERS_FAIL:
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
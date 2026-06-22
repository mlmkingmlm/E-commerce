import { data } from "react-router-dom";
import { CREATE_BRAND_FAIL, CREATE_BRAND_RED, DELETE_BRAND, DELETE_BRAND_FAIL, DELETE_BRAND_SUCCESS, GET_BRAND_RED, RESET_BRAND_STATUS, UPDATE_BRAND_RED, UPDATE_BRAND_FAIL } from "../Constants";

const initialState = {
    data: [],
    loading: false,
    error: null,
    actionStatus: null,
    message: null
}

export function brandReducer(state = initialState, action) {
    console.log(action.payload)
    switch (action.type) {
        case CREATE_BRAND_RED:
            return {
                ...state,
                success: true,
                message: action.message,
                data: [...state.data, action.payload]
            }

        case CREATE_BRAND_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };

        case GET_BRAND_RED:
            return {
                ...state,
                data: action.payload
            }
        case UPDATE_BRAND_RED:
            return {
                ...state,
                loading: false,
                success: true,
                data: state.data.map(item =>
                    item._id === action.payload._id ? action.payload : item
                ),
                message: action.message
            }

        case UPDATE_BRAND_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };

        case DELETE_BRAND:
            return {
                ...state,
                loading: true,
                actionStatus: "LOADING"
            }

        case DELETE_BRAND_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.filter(item => item._id !== action.id), // ✅ UI update
                actionStatus: "SUCCESS",
                message: action.message
            }

        case DELETE_BRAND_FAIL:
            return {
                ...state,
                loading: false,
                actionStatus: "FAIL",
                error: action.message
            }

        case RESET_BRAND_STATUS:
            return {
                ...state,
                success: false,
                error: null,
                message: ""
            };

        default:
            return state

    }
}
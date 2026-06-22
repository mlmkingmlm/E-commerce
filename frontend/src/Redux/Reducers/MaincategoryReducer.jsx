import {
    CREATE_MAINCATEGORY,
    CREATE_MAINCATEGORY_RED,
    CREATE_MAINCATEGORY_FAIL,
    GET_MAINCATEGORY_RED,
    UPDATE_MAINCATEGORY_RED,
    RESET_MAINCATEGORY_STATUS,
    UPDATE_MAINCATEGORY,
} from "../Constants";

const initialState = {
    data: [],
    loading: false,
    error: null,
    actionStatus: null,
    message: null
}

export function maincategoryReducer(state = initialState, action) {
    switch (action.type) {

        case CREATE_MAINCATEGORY:
            return {
                ...state,
                loading: true,
                success: false,
                error: null
            };

        case CREATE_MAINCATEGORY_RED:
            return {
                ...state,
                loading: false,
                success: true,
                data: [...state.data, action.payload],
                message: action.message
            };

        case CREATE_MAINCATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };

        case GET_MAINCATEGORY_RED:
            return {
                ...state,
                data: action.payload
            };

        case UPDATE_MAINCATEGORY:
            return {
                ...state,
                loading: true,
                success: false,
                error: null
            };

        case UPDATE_MAINCATEGORY_RED:
            return {
                ...state,
                loading: false,
                success: true,   // 🔥 THIS IS IMPORTANT
                data: state.data.map(item =>
                    item._id === action.payload._id ? action.payload : item
                ),
                message: action.message
            };

        case "UPDATE_MAINCATEGORY_FAIL":
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };

        case "DELETE_MAINCATEGORY":
            return {
                ...state,
                loading: true,
                actionStatus: "LOADING"
            }

        case "DELETE_MAINCATEGORY_SUCCESS":
            return {
                ...state,
                loading: false,
                data: state.data.filter(item => item._id !== action.id), // ✅ UI update
                actionStatus: "SUCCESS",
                message: action.message
            }

        case "DELETE_MAINCATEGORY_FAIL":
            return {
                ...state,
                loading: false,
                actionStatus: "FAIL",
                error: action.message
            }


        case RESET_MAINCATEGORY_STATUS:
            return {
                ...state,
                success: false,
                error: null,
                message: ""
            };

        default:
            return state;
    }
}
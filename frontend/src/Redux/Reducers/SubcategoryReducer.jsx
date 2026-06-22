import { CREATE_SUBCATEGORY_RED, CREATE_SUBCATEGORY, CREATE_SUBCATEGORY_FAIL, DELETE_SUBCATEGORY_RED, GET_SUBCATEGORY_RED, UPDATE_SUBCATEGORY_RED, RESET_SUBCATEGORY_STATUS, DELETE_SUBCATEGORY, DELETE_SUBCATEGORY_SUCCESS, DELETE_SUBCATEGORY_FAIL, UPDATE_SUBCATEGORY_FAIL } from "../Constants";

const initialState = {
    data: [],
    loading: false,
    error: null,
    actionStatus: null,
    message: null
}

export function subcategoryReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_SUBCATEGORY:
            return {
                ...state,
                loading: true,
                success: false,
                error: null
            };

        case CREATE_SUBCATEGORY_RED:
            return {
                ...state,
                loading: false,
                success: true,
                data: [...state.data, action.payload],
                message: action.message
            };

        case CREATE_SUBCATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };

        case GET_SUBCATEGORY_RED:
            return {
                ...state,
                data: action.payload
            };
        case UPDATE_SUBCATEGORY_RED:
            return {
                ...state,
                loading: false,
                success: true,
                data: state.data.map(item =>
                    item._id === action.payload._id ? action.payload : item
                ),
                message: action.message
            }

        case UPDATE_SUBCATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };

        case DELETE_SUBCATEGORY:
            return {
                ...state,
                loading: true,
                actionStatus: "LOADING"
            }

        case DELETE_SUBCATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.filter(item => item._id !== action.id), // ✅ UI update
                actionStatus: "SUCCESS",
                message: action.message
            }

        case DELETE_SUBCATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                actionStatus: "FAIL",
                error: action.message
            }

        case RESET_SUBCATEGORY_STATUS:
            return {
                ...state,
                success: false,
                error: null,
                message: ""
            }

        default:
            return state

    }
}
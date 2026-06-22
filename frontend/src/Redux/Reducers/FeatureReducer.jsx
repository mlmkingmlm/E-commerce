import {
    CREATE_FEATURE_RED,
    DELETE_FEATURE_RED,
    GET_FEATURE_RED,
    UPDATE_FEATURE_RED,
    CREATE_FEATURE_FAIL,
    UPDATE_FEATURE_FAIL,
    DELETE_FEATURE_FAIL,
    GET_FEATURE_FAIL,
    RESET_FEATURE_STATUS
} from "../Constants";

const initialState = {
    data: [],
    loading: false,
    error: null,
    success: null,
    message: null
}

export function featureReducer(state = initialState, action) {
    switch (action.type) {

        // ✅ CREATE
        case CREATE_FEATURE_RED:
            return {
                ...state,
                data: [...state.data, action.payload],
                success: true,
                error: null,
                message: action.message
            }

        case CREATE_FEATURE_FAIL:
            return {
                ...state,
                success: false,
                error: action.message
            }

        // ✅ GET
        case GET_FEATURE_RED:
            return {
                ...state,
                data: action.payload,
                error: null
            }

        case GET_FEATURE_FAIL:
            return {
                ...state,
                error: action.message
            }

        // ✅ UPDATE
        case UPDATE_FEATURE_RED:
            return {
                ...state,
                data: state.data.map(item =>
                    item._id === action.payload._id
                        ? { ...item, ...action.payload }
                        : item
                ),
                success: true,
                message: action.message
            }

        case UPDATE_FEATURE_FAIL:
            return {
                ...state,
                success: false,
                error: action.message
            }

        // ✅ DELETE
        case DELETE_FEATURE_RED:
            return {
                ...state,
                data: state.data.filter(item => item._id !== action.payload),
                success: true,
                message: action.message
            }

        case DELETE_FEATURE_FAIL:
            return {
                ...state,
                success: false,
                error: action.message
            }

        case RESET_FEATURE_STATUS:
            return {
                ...state,
                success: false,
                loading: false,
                error: null
            }

        default:
            return state
    }
}
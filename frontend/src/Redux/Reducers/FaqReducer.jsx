import {
    CREATE_FAQ_FAIL,
    CREATE_FAQ_RED,
    DELETE_FAQ_RED,
    GET_FAQ_RED,
    RESET_FAQ_STATUS,
    UPDATE_FAQ_RED
} from "../Constants";

const initialState = {
    data: [],
    loading: false,
    error: null,
    success: null,
    message: null
}

export function faqReducer(state = initialState, action) {
    switch (action.type) {

        // ✅ CREATE
        case CREATE_FAQ_RED:
            return {
                ...state,
                success: true,
                loading: false,
                error: null,
                data: [...state.data, action.payload],
                message: action.message
            }

        case CREATE_FAQ_FAIL:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.message
            }

        // ✅ GET
        case GET_FAQ_RED:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null
            }

        // ✅ UPDATE
        case UPDATE_FAQ_RED:
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

        // ✅ DELETE
        case DELETE_FAQ_RED:
            return {
                ...state,
                data: state.data.filter(item => item._id !== action.payload),
                success: true,
                message: action.message
            }

        case RESET_FAQ_STATUS:
            return{
                ...state,
                success:false,
                error:null,
                loading:false
            }

        default:
            return state
    }
}
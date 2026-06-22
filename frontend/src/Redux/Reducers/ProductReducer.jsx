import {
    CREATE_PRODUCT_FAIL,
    CREATE_PRODUCT_RED,
    DELETE_PRODUCT,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_RED,
    GET_PRODUCT_RED,
    RESET_PRODUCT_STATUS,
    UPDATE_PRODUCT_RED,
    UPDATE_PRODUCT_FAIL
} from "../Constants";

const initialState = {
    data: [],
    loading: false,
    error: null,
    actionStatus: null,
    message: null,
    success: false
};

export function productReducer(state = initialState, action) {
    switch (action.type) {

        // ✅ CREATE
        case CREATE_PRODUCT_RED:
            return {
                ...state,
                loading: false,
                success: true,
                data: [...state.data, action.payload],
                message: action.message
            };

        case CREATE_PRODUCT_FAIL:
            console.log("create fail")
            return {
                ...state,
                loading: false,
                success: false,
                error: action.message
            };

        // ✅ GET
        case GET_PRODUCT_RED:
            return {
                ...state,
                data: action.payload
            };

        // ✅ UPDATE
        case UPDATE_PRODUCT_RED:
            return {
                ...state,
                loading: false,
                success: true,
                data: state.data.map(item =>
                    item._id === action.payload._id
                        ? { ...item, ...action.payload }
                        : item
                ),
                message: action.message
            };

        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };

        // ✅ DELETE START (optional but good practice)
        case DELETE_PRODUCT:
            return {
                ...state,
                loading: true,
                actionStatus: "LOADING"
            };

        // ✅ DELETE SUCCESS
        case DELETE_PRODUCT_RED:
            return {
                ...state,
                loading: false,
                success: true,
                data: state.data.filter(item => item._id !== action.id),
                actionStatus: "SUCCESS",
                message: action.message
            };

        // ✅ DELETE FAIL
        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                actionStatus: "FAIL",
                error: action.error
            };

        // ✅ RESET
        case RESET_PRODUCT_STATUS:
            return {
                ...state,
                success: false,
                error: null,
                message: "",
                actionStatus: null
            };

        default:
            return state;
    }
}
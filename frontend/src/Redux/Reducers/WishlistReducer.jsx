import {
    CREATE_WISHLIST_RED,
    CREATE_WISHLIST_FAIL,

    GET_WISHLIST_RED,

    UPDATE_WISHLIST_RED,
    UPDATE_WISHLIST_FAIL,

    DELETE_WISHLIST_SUCCESS,
    DELETE_WISHLIST_FAIL

} from "../Constants";


const initialState = {
    data: [],
    loading: false,
    error: null,
    success: false,
    message: ""
}


export function wishlistReducer(
    state = initialState,
    action
) {

    switch (action.type) {


        // CREATE
        case CREATE_WISHLIST_RED:

            return {
                ...state,
                success: true,
                message: action.message,
                data: [...state.data, action.payload]
            }


        case CREATE_WISHLIST_FAIL:

            return {
                ...state,
                success: false,
                error: action.message
            }



        // GET
        case GET_WISHLIST_RED:

            return {
                ...state,
                data: action.payload
            }



        // UPDATE
        case UPDATE_WISHLIST_RED:

            return {
                ...state,
                success: true,
                data: state.data.map(item =>
                    item._id === action.payload._id
                        ? action.payload
                        : item
                ),
                message: action.message
            }


        case UPDATE_WISHLIST_FAIL:

            return {
                ...state,
                success: false,
                error: action.message
            }



        // DELETE
        case DELETE_WISHLIST_SUCCESS:

            return {
                ...state,
                data: state.data.filter(
                    item => item._id !== action.id
                ),
                message: action.message
            }


        case DELETE_WISHLIST_FAIL:

            return {
                ...state,
                error: action.message
            }



        default:

            return state
    }
}
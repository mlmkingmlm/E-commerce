import {
    CREATE_CART_RED,
    DELETE_CART_RED,
    GET_CART_RED,
    UPDATE_CART_RED
} from "../Constants";

const initialState = {
    data: [],
    loading: false,
    error: null,
    actionStatus: null,
    message: null
}

export function cartReducer(state = initialState, action) {
    console.log(action.type)

    switch (action.type) {

        case CREATE_CART_RED:
            return {
                ...state,
                data: [...state.data, action.payload]
            }

        case GET_CART_RED:
            console.log(action.payload)
            return {
                ...state,
                data: action.payload
            }

        case UPDATE_CART_RED:

            return {
                ...state
            }

        case DELETE_CART_RED:

            return {
                ...state
            }

        default:
            return state
    }
}
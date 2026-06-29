import { CREATE_CHECKOUT_FAIL, CREATE_CHECKOUT_RED, DELETE_CHECKOUT_RED, GET_CHECKOUT_FAIL, GET_CHECKOUT_RED, UPDATE_CHECKOUT_RED } from "../Constants";

const INITIAL_STATE = {
    loading: false,
    message: "",
    success: false,
    data: [],
    error: ""
}
export function checkoutReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CREATE_CHECKOUT_RED:
            return {
                ...state,
                loading: true,
                message: "Order Created SuccessFully",
                success: true,
                data: [...state.data, action.payload]
            }

        case CREATE_CHECKOUT_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };

        case GET_CHECKOUT_RED:
            return {
                ...state,
                data: action.payload
            }

        case GET_CHECKOUT_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error
            };

        case UPDATE_CHECKOUT_RED:
            let index = state.findIndex(x => x.id === action.payload.id);
            state[index].name = action.payload.name;
            state[index].pic = action.payload.pic;
            state[index].active = action.payload.active;
            return state;

        case DELETE_CHECKOUT_RED:
            return state.filter(x => x.id !== action.payload.id)

        default:
            return state

    }
}
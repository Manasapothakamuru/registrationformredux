const initialState = {
    loading: false,
    data: [],
    error: null,
    status: '',
};


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "SUBMIT_REQUEST":
            return { ...state, loading: true, error: null };
        case "SUBMIT_SUCCESS":
            return { ...state, loading: false, data: [...state.data, action.payload],status:'Successfull' };
        case "SUBMIT_FAILURE":
            return {...state, error: action.payload};
        default:
            return state;
    }
}

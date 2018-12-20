const initialState = {}

export const GetProducts = (state = initialState, action) => {
    switch(action.type){
        case 'GET_ALL_PRODUCTS':
            state = {
                ...state,
                products: [...action.payload]
            }   
            return state
        default: 
            return state
    }
}

export const UploadProduct = (state = initialState, action) => {
    switch(action.type) {
        case 'UPLOAD_PRODUCT':
            return state
        default:
            return state
    }
}
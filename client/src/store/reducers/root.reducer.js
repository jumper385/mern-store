import { combineReducers } from 'redux'
import { GetProducts, UploadProduct } from './products.reducer';

const rootReducer = combineReducers({
    GetProducts: GetProducts, 
    UploadProduct: UploadProduct
})

export default rootReducer
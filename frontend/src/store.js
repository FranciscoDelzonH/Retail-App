import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer, productDeleteReducer,productCreateReducer,productUpdateReducer,productReviewCreateReducer,productTOPReducer} from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'
import { orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListReducer, ordersListReducer,orderDeliverReducer } from './reducers/orderReducers.js'
import { userLoginReducer,userRegisterReducer,userDetailsReducer,userUpaDateReducer, userListReducer, userDeleteReducer, userUpdateReducer } from './reducers/userReducers.js'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTOPReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpaDateReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdatee: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListReducer,
    orderList: ordersListReducer,
    orderDeliver: orderDeliverReducer,

})

const cartItemsFromStorage = localStorage.getItem('carItems') 
                             ? JSON.parse(localStorage.getItem('cartItems')) 
                             : [] ;

const userInfoFromStorage = localStorage.getItem('userInfo') 
                            ? JSON.parse(localStorage.getItem('userInfo')) 
                            : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}


const initialState = {
    cart: {cartItems: cartItemsFromStorage,shippingAddress: shippingAddressFromStorage,paymentMethod:  localStorage.getItem('paymentMethod') ? localStorage.getItem('paymentMethod')  : ''},
    userLogin: {userInfo: userInfoFromStorage},
    

    
}

const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))


export default store
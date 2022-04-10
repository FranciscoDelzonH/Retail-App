import './index.css';
import { Container } from 'react-bootstrap';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './Componentes/Header';
import Footer from './Componentes/Footer';
import Homescreens from './Screens/Homescreens';
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ProfileScreen from './Screens/ProfileScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import OrderScreen from './Screens/OrderScreen';
import Order from './Screens/Order';
import UserListScreen from './Screens/UserListScreen';
import UserEditScreen from './Screens/UserEditScreen';
import Productlist from './Screens/Productlist';
import ProductEditScreen from './Screens/ProductEditScreen';
import OrderListScreen from './Screens/OrderListScreen';

function App() {
  return (
    <>
      <Router>
        <Header/>
        <main className='py-3'>
          <Container>
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route path='/product/:id' component={ProductScreen}/>
            <Route path="/admin/product/:id/edit" component={ProductEditScreen} />
            <Route path='/cart/:id?' component={CartScreen}/>
            <Route path='/' component={Homescreens} exact/>
            <Route path='/page/:pageNumber' component={Homescreens} exact/>
            <Route path='/search/:keyword' component={Homescreens} exact/>
            <Route path='/search/:keyword/page/:pageNumber' component={Homescreens} exact/>
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={OrderScreen} />
            <Route path='/order/:id' component={Order} />
            <Route path='/admin/productlist' component={Productlist} exact/>
            <Route path='/admin/productlist/:pageNumber' component={Productlist} exact/>
            <Route path='/admin/orderlist' component={OrderListScreen} />
          </Container>
        </main>
        <Footer/>
      </Router>
    </>
  );
}

export default App;


// import './App.css';

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/404"
import {

  Routes,
  Route
} from 'react-router-dom'
import Home from "./pages/Home";
// import { store } from './redux/store'
import { Provider, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import axios from 'axios'
import { setUser } from "./redux/slice/UserSlice";
import ShowProduct from "./pages/products/ShowProduct";
import Cart from "./pages/Cart"
import { setCart } from "./redux/slice/CartSlice";
import CreateProduct from "./pages/products/CreateProduct";


function App() {
const dispatch = useDispatch()

const [search_term, setsearchTerm] = useState("")
  useEffect(() => {
    let access_token = localStorage.getItem("access_token");
    if (access_token) {
      let url = "http://localhost:8000/api/getuser";
      axios.get(url, {
        headers: {
          Authorization: `${access_token}`,
        },
      })
      .then(res => {
        console.log(res.data.user);
        dispatch(setUser(res.data.user))
        
      })
      
      .catch(err => {
        console.error(err);
      });
      // let cart_item = localStorage.getItem(cart_item)
      //   if (cart_item) {
      //     dispatch(setCart(JSON.parse(cart_item)))
      //   }
      let cart_items = localStorage.getItem("cart_items ");
      if (cart_items) {
            dispatch(setCart([{a : 1}]))
          }
    }
    
  }, []);

  return (
    <>

  
          <Navbar setsearchTerm = {setsearchTerm}/>

        <div className="container">
      <Routes>
        <Route path="*" element = {<Home search_term = {search_term}/>}/>
        <Route path="cart" element = {<Cart/>}/>
        <Route path="products">
          <Route index element = {<Home/>}/>
          <Route path =":id" element = {<ShowProduct/>}/>
          <Route path ="edit/:id" element = {<CreateProduct/>}/>

          <Route path ="create" element = {<CreateProduct/>}/>

        </Route>

          
        <Route path="login" element = {<Login/>}/>
        <Route path="signup" element = {<Signup/>}/>
        <Route path="*" element = {<PageNotFound/>}/>


 {/* <Login/>
 <Signup/> */}
      </Routes>
  
 </div>
    </>
  );
}

export default App;






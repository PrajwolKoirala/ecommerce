import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { setUser } from '../redux/slice/UserSlice'


export default function Navbar(props) {


const user = useSelector((redux_state) => redux_state.user.value)
const cart_items = useSelector((redux_state) => redux_state.cart_items.value)


console.log(user);

const dispatch = useDispatch()
const handleLogOut = () => {
  localStorage.clear()
  dispatch(setUser(null))
}

// let cart_items_quantity = 

  return (
    <>
    
         <div className="App">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="">LOGO</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
{
      !user
        &&
        <>

        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="signup">Signup</Link>
        </li>

        </>
}
{
      user
      &&
      <>
      <li className="nav-item">
        
          <Link className="nav-link active" aria-current="page" to="/cart">Cart({cart_items.length})</Link>

        
        </li>
           <li className="nav-item">
        
           <Link className="nav-link active" aria-current="page" to="/products/create">create product</Link>
 
         
         </li>
</>
        
}     
      </ul>
      <form className="d-flex" role="search" onSubmit={(e) => {
  e.preventDefault();
  const searchTerm =e.target.search.value
  props.setsearchTerm(searchTerm);
}}>
{ 
    user
    &&
     <button className="btn btn-outline-success" type="button" onClick={handleLogOut}>logout</button>
}


        <input className="form-control me-2" type="search" name='search'  placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    </div>
    </>
  )
}

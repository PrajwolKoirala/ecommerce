import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../redux/slice/UserSlice'
import { useDispatch } from 'react-redux'

export default function Login() {
const dispatch = useDispatch()

  const [formData, setFormdata] = useState({

    email : "pr123@pr",
    password : "12345678"
  }
  )
  const [error, setError] = useState("")
  const navigate = useNavigate()
function handleSubmit(e){
  
  e.preventDefault()
  let url = "http://localhost:8000/api/login"
  
  axios.post(url, formData)
  .then(res => {
    console.log("User Data:", res.data);
    console.log({res});
    dispatch(setUser(res.data.data));

    localStorage.setItem("access_token",res.data.token)

    navigate("/")
  })
  
  .catch(err => {
    console.log(err.response.data.msg);
    setError(err.response.data.msg)
  });
}

  function handleChange(e){
    console.log(e.target.name);
    setFormdata({...formData, [e.target.name] : e.target.value})
  }

  return (
    // <div><h1>Login</h1></div>
    <>
  {
    error
    &&
    <div class="alert alert-danger" role="alert">
      {error}
</div>

  }

    <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" value = {formData.email} aria-describedby="emailHelp" name='email' required onChange={handleChange}/>
  
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" value={formData.password} id="exampleInputPassword1" value={formData.password} name='password' required onChange={handleChange}/>

  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</>
  )
}

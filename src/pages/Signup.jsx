import React, { useState } from 'react'
import axios from 'axios'
import ErrorMessage from '../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
  
  // const [name, setName] =  useState("default")

const [Submitted,setSUbmitted] = useState(false)

// const [error, setError] = useState({
//   name:"",
//   email :"",
//   password : "",
  
// })
const navigate = useNavigate()
  const [formData, setFormdata] = useState({

    name : "",
    email : "",
    password : ""
  }
  )

  const [apiError, setApiError] = useState ('')

  // function handleChange(e) {
  // console.log(e.target.name);
  //     setFormdata({
  //    ...formData , [e.target.name] : e.target.value
  //     })

  //  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormdata(prevData => ({
      ...prevData,
      [name]: value
    }));
  }
  
  
  
  function handleSubmit(event) {
        event.preventDefault()

        //check form validation 
setSUbmitted(true)
let validFormData = true
// setError(prev => ({
//   ...prev,
//   name: !formData.name ? "required" : "",
//   email: !formData.email ? "required" : "",
//   password: !formData.password ? "required" : "",
// }));
 if (!formData.name){
  validFormData = false
 }
 if (!formData.email){
  validFormData = false
 }
 if (!formData.password){
  validFormData = false
 }


if(validFormData){

  //api call
  let url = "http://localhost:8000/api/signup"
  let data = { 
    "name" : event.target.name.value,
    "email" : event.target.email.value,
            "password" : event.target.password.value,
            "role":event.target.role.value
        }
        
        axios.post(url,data)
        .then(res => {
          console.log({res});
          navigate('/login')
        })
        .catch(err => {
          // console.log({err});
          // console.log(err.response.data.error);
          const errorMessage = err.response.data.error.split(': ')[1];
          setApiError(errorMessage)
        })
      }
    
    }
    return (
    <>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
    <label  className="form-label">Name</label>
    <input  className="form-control" name='name'value={formData.name} onChange={handleChange} required/>
    {/* {
      (Submitted && !formData.name)
      &&
     <ErrorMessage msg = {error.name} />
    
    } */}
    {
     !formData.name &&
    <  ErrorMessage msg = "required "/>
    }
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" value = {formData.email} aria-describedby="emailHelp" name='email' required onChange={handleChange}/>
    {
       !formData.email &&
    <  ErrorMessage msg = "required "/>
    }
    {
      apiError && <ErrorMessage msg = "email already exsists"/>
    }
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" value={formData.password} name='password' required onChange={handleChange}/>
    {
       !formData.password &&
    <  ErrorMessage msg = "required "/>
    }
  </div>
  
  <div className="mb-3">
    <label  className="form-label">Role</label>
    <select className="form-select" aria-label="Default select example"defaultValue="buyer" name='role' required>
<option value="" defaultValue>Open this select menu</option>

  <option value="buyer">buyer</option>
  <option value="seller">seller</option>

</select>
{/* {
        !formData.role
      &&
     <ErrorMessage msg = "required" />
    
    } */}
  </div>
 
<button type="submit" className="btn btn-primary">Submit</button>

  </form>

    </>
  );
}






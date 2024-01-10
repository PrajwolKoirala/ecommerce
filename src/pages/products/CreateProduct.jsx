import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'


export default function CreateProduct() {
    const [data, setdata] = useState({
      name:"",
      price:"",
      images:[],
    })

const {id} = useParams()
//check if it is edit page 

useEffect(() => {
if(id) {
  
  let url =`http://localhost:8000/api/products/${id}`
 axios.get(url)
 .then(res => {
 
  setdata(res.data.product)

 })
.catch(err =>{
  console.error("Error fetching product:", err);

})
}
},[])

function handleChange(e) {
  if( e.target.name == "images" ){
    setdata({
      ...data,
      
      images: e.target.files
  })
  }else{  setdata({
    ...data,
    
    [e.target.name]: e.target.value
})};
}
function handleSubmit(e) {
  e.preventDefault();
  let url = "http://localhost:8000/api/products";
  let form_Data = new FormData();
  form_Data.append("name", data.name)
  form_Data.append("price", data.price)
  // form_Data.append("images", data.images)

  let temp = [...data.images]
  temp.forEach(img => {
      form_Data.append("images", img)

  })

let method = 'POST'
console.log('Method:', method);

if (id) {
  method = 'PUT'
   url = `http://localhost:8000/api/products/${id}`;

}

  // axios[method](url, form_Data, {
    
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem("access_token")}` // Replace with the actual key used for your token
  //   }
  // })
  axios({
    method: method,
    url: url,
    data: form_Data,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
  })
  
  
  .then(response => {
    

    console.log('Product created successfully:', response.data);
  })
  .catch(error => {
    console.error('Error creating product:', error);
  });
  
}

  return (
    <>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
    <label  className="form-label">Name</label>
    <input className="form-control" name='name' value={data?.name || ''} onChange={handleChange} required />
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Price</label>
    <input type="number" className="form-control" id="exampleInputEmail1" value={data?.price || ''} aria-describedby="emailHelp" name='price' required onChange={handleChange} />
    
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">images</label>
    <input type="file" multiple className="form-control" id="exampleInputEmail1" name = "images"  aria-describedby="emailHelp" onChange={handleChange} />
    
    
  </div>
  

 
<button type="submit" className="btn btn-primary">Submit</button>

  </form>

    </>
  );
}


import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import star from "../../assets/images/star.png"
import emptyStar from "../../assets/images/empty.png"

import Rating from "react-rating"
export default function ShowProduct() {


 const {id} = useParams()
const [product, setProduct] = useState({})
const [isLoadingProduct, setisLoadingProduct] = useState(true)
const [rating, setrating] = useState(0)

function fetchProductDetails(){
  let url =`http://localhost:8000/api/products/${id}`
  axios.get(url)
  .then(res => {
   console.log("Fetched product:", res.data)  ;
   setProduct(res.data.product)
   setisLoadingProduct(false)
  })
 .catch(err =>{
   console.error("Error fetching product:", err);
 
 })
}
 useEffect(() => {
  fetchProductDetails()
},[])
 
if (isLoadingProduct){
  return <>
      <div className='homepagespinner'> 

<div className="spinner-border" role="status">
<span className="sr-only"></span>
</div>
</div>
  </>
}
function updateReview(e){
  e.preventDefault()
  axios.post(`http://localhost:8000/api/products/${id}/reviews`, {
    rating: rating,
    comment: e.target.comment.value,
  },{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
  }).then(res => {
    fetchProductDetails()
  })
}
//  console.log(params);
  return (
    <div>
      <div className='row'>
        <div className='col md-6 '>
        <div id="carouselExampleControls" className="carousel slide w-50 h-50" data-bs-ride="carousel">
  <div className="carousel-inner ">
    {
        product.images?.map((image, index) => {
          const imageUrl = `http://localhost:8000/uploads/${product.images[index] }`;

          return <div className={`carousel-item ${index == 0 ? "active" : ""}`}>
            <img src={imageUrl} className="d-block w-100" alt="..." />
          </div>

    })
  }
    {/* // <div className="carousel-item active">
    //   <img src="https://picsum.photos/200" className="d-block w-100 h-100" alt="..."/>
    // </div>
    // <div className="carousel-item">
    //   <img src="https://picsum.photos/300/" className="d-block w-100 h-100" alt="..."/>
    // </div> */}
   
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
        </div>
<div className='col md-6'>
    <h1>{product.name}</h1>
    <p>Price: Rs{product.price}</p>
    <div>
        <a href="#" className="btn btn-primary">Add To Cart</a>
        </div>
        </div>
        
      </div>
      <hr />
      <h3>Reviews</h3>
      {product?.reviews?.map(review => {
        let temp = [];
        for (let i = 0; i < review.rating; i++) {
          temp.push("");
          
        }
        return <div className='p-4' style ={{
          boxShadow: "1px 1px 10px 0px grey"
        }}>
          <p>prj {temp.map(el =>{
            return <img width={20} src={star} alt="" srcset="" />
          })}</p>
          <p>{review.comment}</p>
        </div>

      })}
      <form onSubmit = {updateReview}>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Rating</label>
    <Rating
    initialRating={(rating)}
    onChange={(e) => {
      setrating(e)
    }}
     emptySymbol={<img width={20} src={emptyStar} className="icon" />}
     fullSymbol={<img width={20} src={star} className="icon" />}/>
    {/* <input type="number" name='rating' className="form-control" id="" aria-describedby=""/> */}
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">comment</label>
    <textarea name='comment' className="form-control" id="exampleInputPassword1"/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
      
    </div>
  )
}

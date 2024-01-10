import React, { useEffect, useState } from 'react'
import axios from 'axios';
import imageNotFound from '../assets/images/imageNotFound.jpg'
import { Link, useParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { addToCart } from '../redux/slice/CartSlice';
import { useDispatch, useSelector } from 'react-redux'

export default function Home(props) {

  
  const user = useSelector( (redux_store) => { return redux_store.user.value})

  const dispatch = useDispatch()
  const {id} = useParams()

const[products, setProducts] = useState([])
// const [error, setError] = useState(null);
const [iaLoadingProduct, setiaLoadingProduct] = useState(true)
let[metaData, setMetaData] = useState({
  page:1,
  per_page: 25
})

function fetchProducts() {
  let url = `http://localhost:8000/api/products?search_term=${props.search_term }&page=${metaData.page}`;
  axios.get(url)
  

  .then (res => {
    console.log('Search Term:', props.search_term);

    console.log(res.data.data);
    setProducts(res.data.data)
    setiaLoadingProduct(false)
  })
  .catch(err=>{
    // console.error("Error fetching products:", err);
    // setProducts([]);
    // setError("Error fetching products. Please try again later.");
  })
}

useEffect(() =>{
  fetchProducts()
},[props.search_term,metaData.page])
 
if(iaLoadingProduct) {
  return <>
  <div className='homepagespinner'> 

    <div class="spinner-border" role="status">
    <span class="sr-only"></span>
  </div>
</div>
  </>
}
function handleAddToCart(e,product){
  e.preventDefault();
  console.log("btn");
  dispatch(addToCart(product))
}
// function handleDelete(id){
//   if (window.confirm("Are you sure you want to delete this product?")) {
//     let url = `http://localhost:8000/api/products/${id}`
//     axios.delete({url, 
//       headers : {
        
//           Authorization : `Bearer ${localStorage.getItem("access_token")}`
//        } 
//       }
//       )
//       .then(res => {
//         console.log("deleted");
//       })
//       .catch(err=> {
//          console.error(err);
//       })

      
//     }
//   }
// function handleDelete(id) {
//   if (window.confirm("Are you sure you want to delete this product?")) {
//     let url = `http://localhost:8000/api/products/${id}`;
//     axios
//       .delete(url, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`
//         }
//       })
//       .then(res => {
//         console.log("Product deleted successfully:", res.data);

//         // Fetch the updated list of products after deletion
//         let updatedUrl = `http://localhost:8000/api/products?search_term=${props.search_term }&page=${metaData.page}`;
//         axios.get(updatedUrl)
//           .then (res => {
//             console.log('Search Term:', props.search_term);
//             console.log(res.data.data);
//             setProducts(res.data.data)
//             setiaLoadingProduct(false)
//           })
//           .catch(err => {
//             console.error("Error fetching products:", err);
//             setProducts([]);
//           });
//       })
//       .catch(err => {
//         console.error("Error deleting product:", err);
//       });
//   }
// }


function handleDelete(id) {
  if (window.confirm("Are you sure you want to delete this product?")){
  let url = `http://localhost:8000/api/products/${id}`
   axios.delete(url, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
   })
   .then(res => {
    fetchProducts()
   })
}
}

return (
  <div>
    <h1>List Of Products</h1>
    
    <ReactPaginate
        className='react-paginate'
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(e) => {
          setMetaData({...metaData,page: e.selected + 1})
        }}
        pageRangeDisplayed={5}
        pageCount={5}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    {console.log(products)}
    <div className='products row'>
    
       {
         products.map(product => {
          // console.log("products :", product);
          // console.log(`Image URL: http://localhost:8000/uploads/${product.images[0]}`);
          const imageUrl = `http://localhost:8000/uploads/${product.images[0] }`;
console.log('Product:', product.name);
console.log('Image URL:', imageUrl);



           //  return <p>{product.name}</p>
           return <div className='col-sm-6 col-md-3 p-3'> 
<Link to ={`/products/${product._id}`}>
  
           <div className="card product " >
        {/* <img src={imageNotFound} className="card-img-top" alt="..."/> */}

        {/* <img src={ product.images[0] || imageNotFound} className="card-img-top" alt="..."/> */}
       
       {/* most important thing */}
        {product.images[0] ? (
  <img src={imageUrl} className="card-img-top" alt={product.name} />
) : (
  <img src={imageNotFound} className="card-img-top" alt="..."/>
  
)}


        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">Rs {product.price}</p>

          {
  user && user.role != "buyer" ? (
    <>
  <Link to={`/products/edit/${product._id}`}>
    <button className="btn btn-primary " type='button' >edit</button>
  </Link>
  <Link to={"/"}>
  <button className="btn btn-danger mx - 2" type='button' onClick={() => handleDelete(product._id)}>delete</button>
  </Link>
  </>
  ) : (
    <button className="btn btn-primary" type='button' onClick={(e) => handleAddToCart(e, product)}>Add To Cart</button>

  )
}





           </div> 
           

        </div>
        </Link>
      </div>
        })
      } 
  </div>
      </div>
);

}


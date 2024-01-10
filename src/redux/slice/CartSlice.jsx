import { createSlice } from '@reduxjs/toolkit'



const storedCartData = JSON.parse(localStorage.getItem('cart_items')) || [];

const initialState = {
  value: storedCartData,
};


export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    
    setCart: (state, action) => {
        console.log("set Cart");
        console.log(action);
      state.value = action.payload
    },
    addToCart: (state, action) => {
        console.log("set Cart");
        console.log(action.payload);
        let { _id,name,price} = action.payload

        //check if clicked product already exsists in redux store:
        let exsisting_product = state.value.find((cart_item) => cart_item._id == _id)
        console.log(exsisting_product);

        if (exsisting_product) {
            let temp = [...state.value]
            temp = temp.map(el => {
                if(el._id ==_id){
                    return{
                        ...el,
                        quantity: el.quantity + 1
                    }
                }
                return el
            })
            state.value = temp

        }else {

            state.value.push({
                _id,name,price,quantity:1
            })
        }
        localStorage.setItem("cart_items",JSON.stringify(state.value))

    //   state.value = action.payload
    },
    reset: (state) => {
        localStorage.clear()
        state.value = []
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCart, addToCart, reset} = CartSlice.actions

export default CartSlice.reducer
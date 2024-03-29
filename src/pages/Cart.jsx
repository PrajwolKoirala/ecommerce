import React from 'react'
import { useSelector } from 'react-redux'

export default function Cart() {

const cart_items = useSelector(redux_store => redux_store.cart_items.value)

  return (
    <div>
      {cart_items.map(item=>{
        return<li>{item.name}</li>
      })}
    </div>
  )
}

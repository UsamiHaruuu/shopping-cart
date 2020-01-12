import React, { useState, useEffect } from 'react';
import './App.css';
import ShoppingList from './shoppingList'
import Banner from './Banner'
import {db} from "./firebaseHelpers";
  /*
  https://shopping-cart-43740.firebaseapp.com/
  */
 const createCartList = cartList =>{
   Object.values(cartList.items).filter(item => item.active);
 }
const App = () => {
  const [cart, setCart] = useState();
  const [data, setData] = useState({});
  const products = Object.values(data);
  const handleData = snap =>{
    if(snap.val()){
      setCart(createCartList(snap.val()));
    }
  }
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      if (!response.ok) return;
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);
  useEffect(()=>{
    db.on('value', handleData, error => alert(error));
    return () => {db.off('value', handleData)};
  },[]);
  return (
    <React.Fragment>
    <Banner/>
      <ShoppingList
        products={products}>
      </ShoppingList>
    </React.Fragment>
  )
}

export default App;

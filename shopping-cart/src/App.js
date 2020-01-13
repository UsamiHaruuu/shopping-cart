import React, { useState, useEffect } from 'react';
import './App.css';
import ShoppingList from './shoppingList'
import Banner from './Banner'
import { db } from "./firebaseHelpers";
import { Sort } from "./Sort"
import { Message, List, Container, Button, Icon, Box, Column, Field, Content, Dropdown } from "rbx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import {HighestToLowest, LowestToHighest,OldestToNewest } from './sortingProducts'
/*
https://shopping-cart-43740.firebaseapp.com/
*/

//  const LowestToHighest =  (products) => {
//   if(products)
//   products.sort(function(a,b){
//       return a.price-b.price;
//   })
// }

// const HighestToLowest = async (products) => {
//   if(products)
//     products.sort(function(a,b) {
//       return b.price-a.price;
//   })
// }
// const OldestToNewest =  (products) => {
//   if(products)
//    return products.reverse();
// }

//three order state: 0,1,2,3
const createCartList = cartList => {
  Object.values(cartList.items).filter(item => item.active);
}
function json2array(json) {
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function (key) {
    result.push(json[key]);
  });
  return result;
}
const App = () => {
  const [order, setOrder] = useState("Newest to Oldest");
  const [cart, setCart] = useState();
  const [data, setData] = useState({});
  const products = Object.values(data);
  const handleData = snap => {
    if (snap.val()) {
      setCart(createCartList(snap.val()));
    }
  }
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      if (!response.ok) return;
      const json = await response.json();
      const array = json2array(json);
      setData(array);
    };
    fetchProducts();
  },[]);
  useEffect(() => {
    console.log("change state")
    if (order === "Lowest to Highest") {
      data.sort(function (a, b) {
        return b.price - a.price;
      })
    }
    if (order === "Highest to Lowest") {
      data.sort(function (a, b) {
        return a.price - b.price;
      })
    };
  },[order]);
  useEffect(() => {
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData) };
  }, []);
  return (
    <React.Fragment>
      <Banner />
      <Container style={{ height: '80px' }} align="right">
        <Dropdown>
          <Container>
            <strong>Ordered By</strong>
            <Dropdown.Trigger>
              <Button>
                <span>{order}</span>
                <Icon size="small">
                  <FontAwesomeIcon icon="abacus" />
                </Icon>
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Menu>
              <Dropdown.Content>
                <Dropdown.Item onClick={() => setOrder("Lowest to Highest")}>Lowest to Highest</Dropdown.Item>
                <Dropdown.Item onClick={() => setOrder("Highest to Lowest")}>Highest to Lowest</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>With a divider</Dropdown.Item>
              </Dropdown.Content>
            </Dropdown.Menu>
          </Container>
        </Dropdown>
      </Container>
      <ShoppingList
        products={products}>
      </ShoppingList>
    </React.Fragment>
  )
}

export default App;

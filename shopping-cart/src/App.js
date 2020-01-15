import React, { useState, useEffect } from 'react';
import './App.css';
import {ShoppingList} from './shoppingList'
import Banner from './Banner'
import { db } from "./firebaseHelpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleDown } from '@fortawesome/free-solid-svg-icons'
import { Message, List, Container, Button, Icon, Box, Column, Field, Content, Dropdown } from "rbx";
import 'firebase/database'
//import {HighestToLowest, LowestToHighest,OldestToNewest } from './sortingProducts'
/*
https://shopping-cart-43740.firebaseapp.com/
*/
function json2array(json) {
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(key => {
    result.push(json[key]);
  });
  return result;
}

const createItemsList = (data) => {
  return Object.values(data.products);
}
const createCartList = (data) => {
  return Object.values(data.carts);
}
const App = () => {
  const [order, setOrder] = useState("Newest to Oldest");
  const [carts, setCarts] = useState([]);
  const [data, setData] = useState([]);
  const products = Object.values(data);
  useEffect(() => {
    const handleData = snap => {
      if (snap.val().products) {
        //const array = json2array(snap.val().products)
        setData(createItemsList(snap.val()));
        // console.log(Object.values(snap.val().carts));
        // console.log(carts);
      }
      if(snap.val().carts){
        setCarts(createCartList(snap.val()));
      }

    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData) };
  }, []);

  useEffect(() => {
    console.log(order)
    if (order === "Lowest to Highest") {
      data.sort((a, b) => {
        return b.price - a.price;
      })
    }
    if (order === "Highest to Lowest") {
      data.sort(function (a, b) {
        return a.price - b.price;
      })
    };
    setData(data)
  }, [order]);
  return (
    <React.Fragment>
      <Banner carts={carts} />
      <Container style={{ height: '80px' }} align="right">
        <Dropdown>
          <Container>
            <strong>Ordered By</strong>
            <Dropdown.Trigger>
              <Button>
                <span>{order}</span>
                <Icon size="small">
                  <FontAwesomeIcon icon={faArrowCircleDown} />
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

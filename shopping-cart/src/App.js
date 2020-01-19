import React, { useState, useEffect } from "react";
import "./App.css";
import { ShoppingList } from "./shoppingList";
import Banner from "./Banner";
import { db } from "./firebaseHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown } from "@fortawesome/free-solid-svg-icons";
import { Container, Button, Icon, Dropdown } from "rbx";
import "firebase/database";
import "firebase/auth";
import firebase from "firebase/app";
/*
https://shopping-cart-43740.firebaseapp.com/
*/

const createItemsList = data => {
  return Object.values(data.products);
};
const createCartList = data => {
  return Object.values(data.carts).filter(data => data.active === true);
};
const App = () => {
  const [order, setOrder] = useState("Newest to Oldest");
  const [carts, setCarts] = useState([]);
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  firebase.auth().onAuthStateChanged(setUser);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);
  useEffect(() => {
    const handleData = snap => {
      if (snap.val().products) {
        setData(createItemsList(snap.val()));
      }
      if (snap.val().carts) {
        setCarts(createCartList(snap.val()));
      }
    };
    db.on("value", handleData, error => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  useEffect(() => {
    if (order === "Lowest to Highest") {
      data.sort((a, b) => {
        return b.price - a.price;
      });
      setData(data);
    }
    if (order === "Highest to Lowest") {
      data.sort(function(a, b) {
        return a.price - b.price;
      });
      setData(data);
    }
  }, [order, data]);
  return (
    <React.Fragment>
      <Banner carts={carts} user={user} products={data} />

      <Container style={{ height: "80px" }} align="right">
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
                <Dropdown.Item onClick={() => setOrder("Lowest to Highest")}>
                  Lowest to Highest
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setOrder("Highest to Lowest")}>
                  Highest to Lowest
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>With a divider</Dropdown.Item>
              </Dropdown.Content>
            </Dropdown.Menu>
          </Container>
        </Dropdown>
      </Container>
      <ShoppingList products={data} carts={carts} user={user}></ShoppingList>
    </React.Fragment>
  );
};

export default App;

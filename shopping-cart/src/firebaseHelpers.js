import React from "react";
import firebase from "firebase/app";
import "firebase/database";
import firebaseConfig from "./Config.js";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const LogOut = () => {
  firebase.auth().signOut();
};
const SignUp = () => (
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
);
const removeDot = str => {
  return str.split(".").join("");
};
const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};
/**
 * carts
 *      user[user1,user2,user3]
 *           user1= {items}
 */
const createUserCart = (user) => {
  let dbData;
  db.once("value", function (data) {
    dbData = data.val();
    if (dbData.carts[removeDot(user.email)] === undefined) {
      db.child("carts")
        .child(removeDot(user.email))
        .set({
          user: user.displayName
        })
        .catch(error => alert(error));
    }
  });
}
const addItem = (user, product, carts) => {
  let item = carts.filter(i => i.id === product.sku);
  const id = product.sku;
  const name = product.title.toString();
  const description = product.description.toString();
  const style = product.style.toString();
  if (item.length > 0) {
    db.child("carts")
      .child(removeDot(user.email))
      .child(item[0].id)
      .update({ num: item[0].num + 1 });
  } else {
    const productAttrs = {
      id: id,
      name: name,
      active: true,
      num: 1,
      style: style,
      isFreeShipping: product.isFreeShipping,
      description: description,
      price: product.price
    };
    db.child("carts")
      .child(removeDot(user.email))
      .child(id)
      .set(productAttrs)
      .catch(error => alert(error));
  }
};
const deleteItem = (user, item) => {
  db.child("carts")
    .child(removeDot(user.email))
    .child(item.id)
    .update({ active: false });
};
const updatingItemNumbers = (user, products, db, item, incr) => {
  let updatingNum = Math.max(0, item.num + incr);
  let ivty = products.filter(product => {
    if (product.sku === item.id) return product;
  });
  updatingNum =
    updatingNum > ivty[0].inventory ? ivty[0].inventory : updatingNum;
  if (updatingNum > 0) {
    db.child("carts")
      .child(removeDot(user.email))
      .child(item.id)
      .update({ num: updatingNum });
  } else if (updatingNum === 0) {
    db.child("carts")
      .child(removeDot(user.email))
      .child(item.id)
      .update({ active: false });
  }
};

const checkout = (total, products, db, items) => {
  products.map(product => {
    items.map(item => {
      if (item.id === product.sku) {
        let updatingNum = Math.max(0, product.inventory - item.num);
        db.child("products")
          .child(product.sku)
          .update({ inventory: updatingNum });
        db.child("carts")
          .child(item.id)
          .update({ active: false });
      }
    });
  });
  if (total > 0) alert("Thanks for you purchase!");
};
export {
  checkout,
  SignUp,
  LogOut,
  uiConfig,
  db,
  addItem,
  deleteItem,
  updatingItemNumbers,
  removeDot,
  createUserCart
};

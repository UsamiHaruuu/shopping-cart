import React from 'react'
import firebase from 'firebase/app'
import 'firebase/database'
import firebaseConfig from './Config.js';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const LogOut = () =>{
  firebase.auth().signOut()
}
const SignUp = () => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const addItem = (product, carts) => {
  let item = carts.filter(i => i.id === product.sku);
  const id = product.sku;
  const name = product.title.toString();
  const description = product.description.toString();
  const style = product.style.toString();
  if (item.length > 0) {
    db.child('carts').child(item[0].id).update({ num: item[0].num + 1 })
  }
  else {
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
    db.child('carts').child(id).set(productAttrs)
      .catch(error => alert(error));
  }
}
const deleteItem = item => {
  db.child('carts').child(item.id).update({ active: false })
}
const updatingItemNumbers = (db, item, incr) => {
  let updatingNum = Math.max(0, item.num + incr)
  if (updatingNum > 0) {
    db.child('carts').child(item.id).update({ num: updatingNum })
  } else if (updatingNum === 0) {
    db.child('carts').child(item.id).update({ active: false })
  }
}
export { SignUp, LogOut, uiConfig, db, addItem, deleteItem, updatingItemNumbers }
import firebase from 'firebase/app'
import 'firebase/database'
import firebaseConfig from './Config.js';

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();
const dummy_data_shopping_cart = {

}
const addItem = item => {
  const id = item.sku;
  db.child('products').child(id).catch(error => alert(error));
  const name = item.title;
  const n = 1;
  const productAttrs = { id, active: true, num: n, isFreeShipping: item.isFreeShipping };
  if (db.child('products').child(id) === null) {
    const data = Object.assign(name, productAttrs);
    console.log(data);
    db.child('products').child(id).set(data)
      .catch(error => alert(error));
  } else {
    db.child('products').child(id).update({ num: db.child('products').child(id).num + 1 })
      .catch(error => alert(error));
  }
}

const deleteItem = item => {
  const id = item.sku;
  db.child('items').child(id).update({ num: db.child('products').child(id).num - 1 })
    .catch(error => alert(error));
  if (db.child('items').child(id).num === 0) {
    db.child('items').child(id).update({ active: false })
      .catch(error => alert(error));
  }
}
export { db, addItem, deleteItem }
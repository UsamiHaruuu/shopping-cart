import firebase from 'firebase/app'
import 'firebase/database'
import firebaseConfig from './Config.js';
const getURL = (key) => { return "data/static/products/" + key + "_1.jpg"; }
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();
const dummy_data_shopping_cart = {

}
const addItem = item => {
  const id = item.sku;
  const name = item.title.toString();
  const description = item.description.toString();
  const style = item.style.toString();
  console.log(name)
  console.log(typeof(name))
 // db.child('carts').child(id).catch(error => alert(error));
  console.log(db.child('cart').child(id))
  const productAttrs = {
    id:id,
    name: name,
    active: true,
    num: 1,
    style: style,
    isFreeShipping: item.isFreeShipping,
    description: description,
    price: item.price
  };
    db.child('carts').child(id).set(productAttrs)
      .catch(error => alert(error));
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
const updatingItemNumbers = (db,item,incr) => {
  let updatingNum = Math.max(0,item.num+incr)
  if(item.num>=0){
    if(incr>0){
      db.child('carts').child(item.id).update({num:updatingNum})
    }else{
      db.child('carts').child(item.id).update({num:updatingNum})
    }
  }
}
export { db, addItem, deleteItem, updatingItemNumbers }
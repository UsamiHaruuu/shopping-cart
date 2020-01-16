import React, { Component } from 'react'
import rbx from "rbx/index"
import { Message, List, Container, Button, Icon, Box, Column, Field, Content, Dropdown } from "rbx";
import {addItem,db} from "./firebaseHelpers"
/*
https://shopping-cart-43740.firebaseapp.com/
*/
const getURL = (key) => { return "data/static/products/" + key + "_1.jpg"; }
const sizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"];
const Col = ({ carts,products,db }) => {
    const num = products.length;
    var column = Array.from({ length: num / 4 + 1 }, (_, i) => i);
    return (
        column.map(n => (
            <Column width="100" key={n}>
                <Container>
                    {leftColumn(n,products,db)}
                    {ListOfItem(carts,products, n - 1)}
                </Container>
            </Column>
        ))
    )
}
const leftColumn = (index,products,db) => {

    if (index === 0)
        return (
            <Container align="centered" >
                <Content><strong>Select Size</strong></Content>
                <Button.Group align="centered">{sizeList(products,db)}</Button.Group>
                <Content>Useful Links Below</Content>
                <a href="https://google.com">google</a>
                <div />
                <a href="https://stackoverflow.com">stackoverflow</a>
            </Container>

        )
}
const chooseSize = (products,db,size) => {
    return(
        products.map(product =>{
           if(product.size.includes(size))
           db.child('products').child(product.sku).update({active:false})
           })
    )
}
const sizeList = (products,db) => {
    return (
        sizes.map(size => (
            <Button onClick = {()=>chooseSize(products,db,size)} outlined color="primary" size="normal">{size}</Button>
        ))
    )
}
const price = (price) => {
    return (
        <Field><strong>$ </strong>{price.toFixed(2)}</Field>
    )
}
const ShippingDetail = (product) => (
    product.isFreeShipping ? "Free Shipping!" : null
)

const ListOfItem = (carts, products, n) => {
    return (
        products.map((product, index) => {
            if (index % 4 === n)
                return (
                    <List align="center" width="120" hight="200" key={product.sku}>
                        <Container badge={ShippingDetail(product)}>
                            <img alt="" src={getURL(product.sku)}
                                height="10"
                            ></img>
                        </Container>
                        <Field>{
                            price(product.price)
                        }</Field>
                        <Button size="small" rounded color="warning"> <strong>{product.title}</strong></Button>
                        <Button Focused size="medium" color="dark" onClick={() =>addItem(product,carts)}> Add to Shopping Cart</Button>
                    </List>
                );
        })
    )
}

const ShoppingList = ({ products,carts }) => {
    return (
        <Container>
            <Column.Group>
                <Col products={products} carts = {carts} db = {db}></Col>
            </Column.Group>
        </Container>
    )
}

export { ShoppingList, getURL }

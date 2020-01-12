import React, { Component } from 'react'
import rbx from "rbx/index"
import { Message, List, Container, Button, Input, Box, Column, Delete, Field, Content } from "rbx";

/*
https://shopping-cart-43740.firebaseapp.com/
*/
const getURL = (key) => { return "data/static/products/" + key + "_1.jpg"; }
const sizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"];
const Col = ({ products }) => {
    const num = products.length;
    console.log(num);
    var column = Array.from({ length: num / 4 + 1 }, (_, i) => i);
    return (
        column.map(n => (
            <Column width="100" key={n}>
                <Container>
                    {leftColumn(n)}
                    {ListOfItem(products, n - 1)}
                </Container>
            </Column>
        ))
    )
}
const leftColumn = (index) => {
    console.log("hi")
    if (index === 0)
        return (
            <Container align = "center" >
                <Content><strong>Select Size</strong></Content>
                <Button.Group align = "center">{sizeList()}</Button.Group>
                <Content>Useful Links Below</Content>
                <a href = "https://google.com">google</a>
                <div/>
                <a href = "https://stackoverflow.com">stackoverflow</a>
            </Container>

        )
}
const sizeList = () =>{
    return(
        sizes.map(size=>(
            <Button outlined color = "primary" size = "normal">{size}</Button>
        ))
    )
}
const price = (price) =>{
    
    return(
        <Field><strong>$ </strong>{price}</Field>
    )
}
const ListOfItem = (products, n) => {
    return (
        products.map((product, index) => {
            if (index % 4 === n)
                return (
                    <List align="center" width="120" hight="200" key={product.sku}>
                        <div>
                            <img src={getURL(product.sku)}
                                height="10"
                            ></img>
                        </div>
                        <Field>{
                            price(product.price)
                        }</Field>
                        <Button size="small" rounded color="warning"> <strong>{product.title}</strong></Button>
                        <Button Focused size = "medium" color = "dark"> Add to Shopping Cart</Button>
                    </List>
                );
        })
    )
}
const ShoppingList = ({ products }) => {
    return (
        <Column.Group>
            <Col products={products}></Col>
        </Column.Group>
    )
}

export default ShoppingList

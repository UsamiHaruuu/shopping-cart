import React, { Component } from 'react'
import rbx from "rbx/index"
import { Message, List, Container, Button, Icon, Box, Column, Field, Content, Dropdown } from "rbx";
import { addItem } from "./firebaseHelpers"
/*
https://shopping-cart-43740.firebaseapp.com/
*/
const getURL = (key) => { return "data/static/products/" + key + "_1.jpg"; }
const sizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"];
const Col = ({ products }) => {
    const num = products.length;
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

    if (index === 0)
        return (
            <Container align="center" >
                <Content><strong>Select Size</strong></Content>
                <Button.Group align="center">{sizeList()}</Button.Group>
                <Content>Useful Links Below</Content>
                <a href="https://google.com">google</a>
                <div />
                <a href="https://stackoverflow.com">stackoverflow</a>
            </Container>

        )
}
const sizeList = () => {
    return (
        sizes.map(size => (
            <Button outlined color="primary" size="normal">{size}</Button>
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
const ListOfItem = (products, n) => {
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
                        <Button Focused size="medium" color="dark" onClick={() => addItem(product)}> Add to Shopping Cart</Button>
                    </List>
                );
        })
    )
}

const ShoppingList = ({ products }) => {
    return (
        <Container>
            <Column.Group>
                <Col products={products}></Col>
            </Column.Group>
        </Container>
    )
}

export  {ShoppingList, getURL}

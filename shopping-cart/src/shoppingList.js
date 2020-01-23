import React, { useState } from "react";
import { List, Container, Button, Column, Field, Content } from "rbx";
import { addItem, db } from "./firebaseHelpers";
/*
https://shopping-cart-43740.firebaseapp.com/
*/
const getURL = key => {
  return "data/static/products/" + key + "_1.jpg";
};
const sizes = ["XS", "S", "M", "ML", "L", "XL", "XXL"];
const Col = ({ user, carts, products, db, allsize, selected }) => {
  const num = products.length;
  var column = Array.from({ length: num / 4 + 1 }, (_, i) => i);
  return column.map(n => (
    <Column width="100" key={n}>
      <Container>
        <LeftColumn index={n} products={products} db={db}></LeftColumn>
        <ListOfItem
          carts={carts}
          products={products}
          n={n - 1}
          allsize={allsize}
          selected={selected}
          user={user}
        ></ListOfItem>
      </Container>
    </Column>
  ));
};
const LeftColumn = ({ index, products, db }) => {
  if (index === 0) {
    return (
      <Container align="centered">
        <Content>Useful Links Below</Content>
        <a href="https://google.com">google</a>
        <div />
        <a href="https://stackoverflow.com">stackoverflow</a>
      </Container>
    );
  } else {
    return <Container></Container>;
  }
};

const price = price => {
  return (
    <Field>
      <strong>$ </strong>
      {price.toFixed(2)}
    </Field>
  );
};
const ShippingDetail = product =>
  product.isFreeShipping ? "Free Shipping!" : null;

const Add = ({ user, product, carts }) => {
  if (user) {
    return (
      <Button
        Focused
        size="medium"
        color="dark"
        onClick={() => addItem(user, product, carts)}
      >
        Add to Shopping Cart
      </Button>
    );
  } else return <React.Fragment />;
};
const ListOfItem = ({ user, carts, products, n, allsize, selected }) => {
  let filteredItems = products.filter(product =>
    selected.every(size => product.size.includes(size))
  );
  const Inventory = ({ product }) => {
    return <div>Left: {product.inventory}</div>;
  };
  return filteredItems.map((product, index) => {
    if (index % 4 === n)
      return (
        <List align="center" width="120" hight="200" key={product.sku}>
          <Container badge={ShippingDetail(product)}>
            <img alt="" src={getURL(product.sku)} height="10"></img>
          </Container>
          <Button.Group align="centered" size="small">
            {product.size.map(size => (
              <Button
                onClick={() => {
                  addItem(user, product, carts);
                }}
              >
                {size}
              </Button>
            ))}
          </Button.Group>
          <Inventory product={product} />
          <Field>{price(product.price)}</Field>
          <Button size="small" rounded color="warning">
            {" "}
            <strong>{product.title}</strong>
          </Button>
          <Add user={user} product={product} carts={carts} />
        </List>
      );
    else return <div></div>;
  });
};

const useSelection = () => {
  const [selected, setSelected] = useState([]);
  const toggle = prop => {
    if (prop === "reset") setSelected([]);
    else
      setSelected(
        selected.includes(prop)
          ? selected.filter(y => y !== prop)
          : selected.concat(prop)
      );
  };
  return [selected, toggle];
};
const buttonColor = (size, state) => {
  return state.selected.includes(size) ? "primary" : null;
};
const ShoppingList = ({ user, products, carts }) => {
  console.log(user)
  const [allsize, setAllsize] = useState([]);
  const [selected, toggle] = useSelection();
  const sizeHelper = size => {
    let data = Object.values(allsize);
    if (!data.includes(size)) data.push(size);
    return data;
  };
  const ToggleButton = ({ state, size }) => {
    return (
      <Button
        onClick={() => {
          setAllsize(sizeHelper(size));
          state.toggle(size);
        }}
        outlined
        color={buttonColor(size, state)}
        size="normal"
      >
        {size}
      </Button>
    );
  };
  return (
    <Container>
      <Container>
        <Container align="centered">
          <Content align="centered">
            <strong>Size Filter</strong>
          </Content>
          <Button
            onClick={() => {
              toggle("reset");
            }}
          >
            Reset Filter
          </Button>
          <Button.Group state={{ selected, toggle }}>
            {sizes.map(size => (
              <ToggleButton
                state={{ selected, toggle }}
                size={size}
              ></ToggleButton>
            ))}
          </Button.Group>
        </Container>
      </Container>
      <Column.Group>
        <Col
          user={user}
          products={products}
          carts={carts}
          db={db}
          allsize={allsize}
          selected={selected}
        ></Col>
      </Column.Group>
    </Container>
  );
};

export { ShoppingList, getURL };

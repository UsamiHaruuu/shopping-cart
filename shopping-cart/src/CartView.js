import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Button, Container, Image, Column, List, Title } from 'rbx';
//import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faMinus } from '@fortawesome/free-solid-svg-icons'
import { db, deleteItem, updatingItemNumbers } from './firebaseHelpers'
import { getURL } from "./shoppingList"
//import MailIcon from '@material-ui/icons/Mail';
//https://material-ui.com/components/drawers/#swipeable-temporary-drawer
const useStyles = makeStyles({
  list: {
    width: 'auto',
  },
  fullList: {
    width: 'auto',
  },
});
const EachItem = ({ item }) => {
  return (
    <Column.Group backgroundColor='primary'>
      <Column size="three-quarters">
        <Container>
          <Container>
            <Title>{item.name}</Title>
          </Container>
          <Column.Group>
            <Column>
              <Container>
                <Image.Container size='3by4'>
                  <Image rounded src={getURL(item.id)} />
                </Image.Container>
              </Container>
            </Column>
            <Column align='center'>
              <div>
                Item's Size
              </div>
              <div>
                {item.style}
              </div>
              <div>
                {item.description === "" ? "No description" : item.description}
              </div>
              <div>
                Quantity: {item.num}
              </div>
            </Column>
          </Column.Group>
        </Container>
      </Column>
      <Column>
        <List>
          <List.Item as="button" onClick={() => deleteItem(item)}>
            <FontAwesomeIcon icon={faMinus} />
          </List.Item>
          <List.Item>
            <strong>$</strong>
            {(item.price * item.num).toFixed(2)}
          </List.Item>
          <List.Item>
            <Button.Group>
              <Button onClick={() => updatingItemNumbers(db, item, -1)}>-</Button>
              <Button onClick={() => updatingItemNumbers(db, item, 1)}>+</Button>
            </Button.Group>
          </List.Item>
        </List>
      </Column>
    </Column.Group>
  )
}

const ItemsInCart = ({ items }) => {
  return (
    <List>
      {items.map(item => {
        return (
          <List.Item>
            <EachItem item={item}></EachItem>
          </List.Item>)
      })}
    </List>
  )
}
const Subtotal = ({ items }) => {
  let total = 0;
  if (items) {
    total = items.map(item => (item.price * item.num))
      .reduce((a, b) => (a + b), 0)
  }


  return (
    <Container>
      <div><strong>total price :</strong></div>
      {(total).toFixed(2)}
      <Container>
        <button>check out button</button>
      </Container>
    </Container>
  )
}
const CartView = ({ items, user }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ right: open });
  };

  const sideList = (side, items) => {
    return (
      <Container align='center'
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer({ side }, false)}
        onKeyDown={toggleDrawer({ side }, false)}
      >
        <Image.Container size={128}>
          <Image src="https://cdn0.iconfinder.com/data/icons/shopping-cart-26/1000/Shopping-Basket-03-512.png" />
        </Image.Container>
        <Button badge={items.length} as="Content">Cart</Button>
        <Divider />
        <ItemsInCart items={items}></ItemsInCart>
        <Divider />
        <Subtotal items={items}></Subtotal>
      </Container>
    )
  };
  if(user){
  return (
    <div>
      <Button onClick={toggleDrawer(true)} badge={items.length} badgeColor='warning' color="primary">
        <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
      </Button>
      <Drawer anchor="right" open={state.right} onClose={toggleDrawer(false)}>
        {sideList('right', items)}
      </Drawer>
    </div>
  );
  }else {
    return <div>Please Login</div>
  }
}
export default CartView;
import React from 'react';
import "rbx/index.css";
import { Navbar, Button, Message, Container } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import CartView from './CartView'
const Banner = () => {
    return (
        <Container>
            <Navbar height="auto">
                <Navbar.Brand>
                    <Navbar.Item href="#">
                        <img
                            src="data/static/icon.png"
                            alt=""
                            role="presentation"
                            width="35"
                            height="200"
                        />
                    </Navbar.Item>
                    <Navbar.Burger />
                </Navbar.Brand>
                <Navbar.Menu>
                    <Navbar.Segment align="start">
                        <Navbar.Item>Home</Navbar.Item>
                        <Navbar.Item>Documentation</Navbar.Item>

                        <Navbar.Item dropdown>
                            <Navbar.Link>More</Navbar.Link>
                            <Navbar.Dropdown>
                                <Navbar.Item>About</Navbar.Item>
                                <Navbar.Item>Jobs</Navbar.Item>
                                <Navbar.Item>Contact</Navbar.Item>
                                <Navbar.Divider />
                                <Navbar.Item>Report an issue</Navbar.Item>
                            </Navbar.Dropdown>
                        </Navbar.Item>
                    </Navbar.Segment>

                    <Navbar.Segment align="end">
                        <Navbar.Item>
                            <Button.Group>
                                <Button color="primary">
                                    <strong>Sign up</strong>
                                </Button>
                                <Button color="light">Log in</Button>
                                <CartView></CartView>
                            </Button.Group>
                        </Navbar.Item>
                    </Navbar.Segment>
                </Navbar.Menu>
            </Navbar>
        </Container>
    );
}

export default Banner;

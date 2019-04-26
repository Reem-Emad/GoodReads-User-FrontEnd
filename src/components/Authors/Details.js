import React from 'react';
import Navbar from '../Shared/Navbar';
import './Style.css';
import { getAuthorById } from '../../API/Author';
import { Link } from 'react-router-dom';
import { getBooks } from '../../API/Book'
import { Dropdown, Row, Container, Col, Card, Button, ButtonGroup, ListGroup, ListGroupItem } from 'react-bootstrap';
import ListBooksByAuthor from '../Books/ListByAuthor';
class AuthorDetails extends React.Component {
    constructor() {
        super()
        this.state = {
            author: {},
            isHidden: true
        }
    }
    componentDidMount() {
        getAuthorById(this.props.match.params.id)
            .then(res => {
                this.setState({ author: res });
            })
            .catch(err => {
                console.log(err)
            })
    }
    Hide() {

        this.setState({ isHidden: !this.state.isHidden })
    }

    render() {
        let shown = {
            display: this.state.isHidden ? "block" : "none"
        };

        let hidden = {
            display: this.state.isHidden ? "none" : "block"
        }
        return (
            <>
                <Container className="detailedCard">
                    <Row>
                        <Col sm="1"></Col>
                        <Col sm="3">
                            <Card style={{ width: '15rem', height: '20rem' }}>
                                <Card.Img className="imgMargin" variant="top" src={this.state.author.Image} />
                                <Dropdown as={ButtonGroup}>
                                    <Button variant="success">Follow Author</Button>

                                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                                    <Dropdown.Menu>
                                        <Dropdown.Item hred="#/action-1">Add As a Friend</Dropdown.Item>
                                        <Dropdown.Item hred="#/action-2">Send Message</Dropdown.Item>
                                        <Dropdown.Item hred="#/action-3">Compare Books</Dropdown.Item>
                                        <Dropdown.Item hred="#/action-3">Add to My Favorite Authors</Dropdown.Item>
                                        <Dropdown.Item hred="#/action-3">Edit My Favorite Authors</Dropdown.Item>
                                        <Dropdown.Item hred="#/action-3">See All Authors I Follow</Dropdown.Item>

                                    </Dropdown.Menu>
                                </Dropdown>
                            </Card>
                        </Col>

                        <Col sm="8">
                            <Card style={{ width: '100%' }}>
                                <Card.Body>
                                    <Card.Title>{this.state.author.FullName}</Card.Title>
                                    <Card.Text>
                                        {this.state.author.Website}
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>{this.state.author.Influences}</ListGroupItem>
                                    <ListGroupItem>{this.state.author.Genre}</ListGroupItem>
                                    <ListGroupItem>{this.state.author.Born}</ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                    {this.state.author.Description}
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>

                    {/*  {!this.state.isHidden && <ListBooksByAuthor books={this.state.author.bookData} />} */}
                    {/* <button onclick={this.Hide.bind(this)}>Books</button>
                    <span style={shown}><ListBooksByAuthor books={this.state.author.bookData} /></span>
                    <h2 style={hidden}></h2> */}
                    <ListBooksByAuthor books={this.state.author.bookData} />

                </Container>

            </>
        )

    }
}
export default AuthorDetails;
import React from 'react';
import { getAuthorById } from '../../API/Author';
import { Row, Container, Col, Card,ListGroup, ListGroupItem } from 'react-bootstrap';
import Navbar from '../Shared/Navbar';
import ListBooksByAuthor from '../Books/ListByAuthor';
import './Style.css';
class AuthorDetails extends React.Component {
    constructor() {
        super()
        this.state = {
            author: {},
            isHidden: true,
            error: ""
        }
    }
    componentDidMount() {
        getAuthorById(this.props.match.params.id)
            .then(res => {
                this.setState({ author: res });
            })
            .catch(err => {
                this.setState({ error: "Server Error" });

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
                <Navbar />
                <Container className="detailedCard">
                    <Row>
                        <Col sm="1"></Col>
                        <Col sm="3">
                            <Card style={{ width: '15rem', height: '18rem' }}>
                                <Card.Img className="imgMargin" variant="top" src={this.state.author.Image} />

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
                    <div className="booksList-header">Books by {this.state.author.FullName}:</div>
                    <div style={{ display: "flex", flexWrap: "wrap", border: "4px solid #A78A68", borderRadius: "10px", marginTop: "2px", marginLeft: "95px" }}>

                        <ListBooksByAuthor books={this.state.author.bookData} />
                    </div>
                </Container>

            </>
        )

    }
}
export default AuthorDetails;
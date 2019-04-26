import React from 'react';
import Navbar from '../Shared/Navbar';
import './Style.css';
import StarRatingComponent from 'react-star-rating-component';
import { Dropdown, Row, Container, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import { getBooksById } from '../../API/Book'
class BookDetails extends React.Component {
    state = {
        Book: {}
    }
    componentDidMount() {
        console.log(this.props)
        const id = this.props.match.params.id;
        getBooksById(id)
            .then(res => {
                this.setState({ Book: res });
            })
            .catch(err => {
                console.log(err)
            })

    }
    render() {

        return (
            <>
                <Navbar></Navbar>
                <Container className="detailedCard">
                    <Row>
                        <Col md="1"></Col>
                        <Col md="3">
                            <Card style={{ width: '15rem', height: '20rem' }}>
                                <Card.Img className="imgMargin" variant="top" src={this.state.Book.cover} />
                                <Dropdown as={ButtonGroup}>
                                    <Button variant="success">Want to Read</Button>
                                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                                    <Dropdown.Menu>
                                        <Dropdown.Item hred="#/action-1">Read</Dropdown.Item>
                                        <Dropdown.Item hred="#/action-2">Currently Reading</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>


                            </Card>
                        </Col>
                        <Col md="8">
                            <Card style={{ width: '100%', border: 'none' }}>
                                <Card.Body>
                                    <Card.Title>{this.state.Book.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted" style={{ cursor: 'pointer', textDecoration: 'underline' }}>By {this.state.Book.author}</Card.Subtitle>
                                    {/* rating */}

                                    <StarRatingComponent
                                        name="rate"
                                        starCount={5}
                                        value={this.state.Book.avgRate}
                                        starColor="#ffcf22"
                                        emptyStarColor="#58371F"
                                    />
                                    <br></br>
                                    <br></br>

                                    {/* rating */}

                                    <Card.Text className="fontStyle">
                                        {this.state.Book.description}
                                    </Card.Text>
                                    <Card.Text >{this.state.Book.numOfpages} Page </Card.Text>
                                    <Card.Text >{this.state.Book.category}</Card.Text>
                                </Card.Body>
                            </Card>


                        </Col>
                    </Row>
                </Container>
            </>
        )

    }
}
export default BookDetails;

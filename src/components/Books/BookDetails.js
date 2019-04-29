import React from 'react';
import Navbar from '../Shared/Navbar';
import StarRatingComponent from 'react-star-rating-component';
import PopupMsg from '../Shared/PopupMsg';
import { Dropdown, Row, Container, Col, Card, Button, ButtonGroup } from 'react-bootstrap';
import { getBooksById } from '../../API/Book';
import { addBook } from '../../API/User';
import './Style.css';

class BookDetails extends React.Component {
    state = {
        Book: {},
        error: '',
        showModal: false

    }
    getAuthor = () => (e) => {
        console.log(this.state.Book)
        if (this.state.Book.authorData != undefined && this.state.Book.authorData.length > 0 && this.state.Book.authorData[0]._id != undefined)
            this.props.history.push(`/AuthorDetailes/${this.state.Book.authorData[0]._id}`);
        else {
            return (
                <>
                </>
            )
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        getBooksById(id)
            .then(res => {
                this.setState({ Book: res });
            })
            .catch(err => {
                console.log(err)
            })

    }

    showModal = () => {
        this.setState({ showModal: true });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    }
    addBook = (bookId) => (e) => {
        const status = e.target.name;
        addBook({ bookId, status })
            .then(res => {
                // console.log(res)
                this.showModal();
            })
            .catch(err => {
                this.setState({ error: 'server error' })
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
                                <Dropdown as={ButtonGroup} style={{height:"38px", width:"100%", bottom:"-49px"}}>
                                    <Button variant="success" name="want to read" onClick={this.addBook(this.state.Book.id)}>Want to Read</Button>
                                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                                    <Dropdown.Menu>
                                        <Dropdown.Item hred="#/action-1" name="read" onClick={this.addBook(this.state.Book.id)}>Read</Dropdown.Item>
                                        <Dropdown.Item hred="#/action-2" name="currently reading" onClick={this.addBook(this.state.Book.id)}>Currently Reading</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <PopupMsg show={this.state.showModal} onHide={this.hideModal} msg="Done" />


                            </Card>
                        </Col>
                        <Col md="8">
                            <Card style={{ width: '100%', border: 'none' }}>
                                <Card.Body>
                                    <Card.Title>{this.state.Book.title}</Card.Title>
                                    <Card.Subtitle onClick={this.getAuthor()} className="mb-2 text-muted authorselect" >By {this.state.Book.author}</Card.Subtitle>
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

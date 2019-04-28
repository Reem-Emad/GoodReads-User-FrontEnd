import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { editBookRate, editBookStatus } from '../../API/User';
import { getBooksById } from '../../API/Book';
import PopupMsg from '../Shared/PopupMsg';
import StarRatingComponent from 'react-star-rating-component';

import './Style.css';

class UserBookCard extends React.PureComponent {
    state = {
        error: "",
        rate: 0,
        status: "",
        showModal: false

    }
    componentDidMount = () => {
        this.setState({ rate: this.props.rate, status: this.props.status });
    }
    displayAvgRating = (rating) => {
        let Ratingstars = [];
        for (var i = 0; i < rating; i++) {
            Ratingstars.push(<i key={i} className="fas fa-star checked"></i>);
        }
        return Ratingstars;
    }
    showModal = () => {
        this.setState({ showModal: true });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    }
    onStarClick(nextValue, prevValue, name) {

        // console.log(nextValue, this.props.bookId._Id);
        const bookId = this.props.bookId._id;
        const rate = nextValue;
        editBookRate({ bookId, rate })
            .then(res => { this.setState({ rate }) })
            .catch(err => { this.setState({ error: "server error" }) })

    }
    onStatusClick = (e) => {
        const status = e.target.innerText;
        const bookId = this.props.bookId._id;
        editBookStatus({ bookId, status })
            .then(res => { this.setState({ status }) })
            .catch(err => { this.setState({ error: "server error" }) })
    }

    getBook = (e) => {

        this.props.history.push(`/bookDetailes/${this.props.bookId.id}`);

    }
    showModal = () => {
        this.setState({ showModal: true });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    }
    getAuthor = (name) => (e) => {
        getBooksById(this.props.bookId.id)
            .then(res => {
                try {
                    this.props.history.push(`/authorDetailes/${res.authorData[0].id}`)
                }
                catch
                {
                    this.showModal()
                }
            })
            .catch(err => this.setState({ error: "server error" }))
        //  this.props.history.push(`/authorDetailes/${author.id}`);

    }
    render() {
        const { title, author, cover, avgRate } = this.props.bookId;


        let otherFilters = [];
        if (this.state.status === 'read')
            otherFilters.push({ id: 3, status: 'want to read' }, { id: 1, status: 'currently reading' })
        else if (this.state.status === 'want to read')
            otherFilters.push({ id: 2, status: 'read' }, { id: 1, status: 'currently reading' })
        else
            otherFilters.push({ id: 3, status: 'want to read' }, { id: 2, status: 'read' })


        return (
            <>
            {/* author not found */}
                    <PopupMsg show={this.state.showModal} onHide={this.hideModal} msg="Author details are not available" />

                <Card className="BookCard">
                    <Card.Img variant="top" src={cover} className="BookCard_img" />
                    <Card.Body>
                        <Card.Text style={{ marginRight: '10px', textDecoration: 'underline', cursor: 'pointer' }} onClick={this.getBook} ><span style={{ marginRight: '3px', color: '#58371F', fontWeight: 'Bold' }}>Title: </span>{title}</Card.Text>
                        <Card.Text style={{ marginRight: '10px', textDecoration: 'underline', cursor: 'pointer' }} onClick={this.getAuthor(author)}><span style={{ marginRight: '3px', color: '#58371F', fontWeight: 'Bold' }}>Author: </span>{author}</Card.Text>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Card.Text style={{ marginRight: '10px' }} ><span style={{ marginRight: '3px', color: '#58371F', fontWeight: 'Bold' }}>AVG Rating: </span>
                            </Card.Text>

                            {
                                avgRate !== undefined ?
                                    <StarRatingComponent
                                        name="rate"
                                        starCount={5}
                                        value={avgRate}
                                        starColor="#ffcf22"
                                        emptyStarColor="#58371F"
                                    />
                                    :
                                    <StarRatingComponent
                                        name="rate"
                                        starCount={5}
                                        value={0}
                                        starColor="#ffcf22"
                                        emptyStarColor="#58371F"
                                    />

                            }
                        </div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <Card.Text style={{ marginRight: '10px' }}>
                                <span style={{ marginRight: '3px', color: '#58371F', fontWeight: 'Bold' }}>Rating:</span>
                            </Card.Text>

                            {
                                <StarRatingComponent
                                    name="rate"
                                    starCount={5}
                                    value={this.state.rate}
                                    onStarClick={this.onStarClick.bind(this)}
                                    starColor="#ffcf22"
                                    emptyStarColor="#58371F"
                                />
                            }
                        </div>
                        <Dropdown  >
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="BookCars_dropdown--btn">
                                {this.state.status}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='BookCars_dropdown--list'>
                                {
                                    otherFilters.map(filter => (<Dropdown.Item key={filter.id} className='BookCars_dropdown--listItem' onClick={this.onStatusClick}>{filter.status}</Dropdown.Item>))
                                }
                            </Dropdown.Menu>

                        </Dropdown>
                    </Card.Body>
                </Card>
            </>
        )
    }
}
export default withRouter(UserBookCard);
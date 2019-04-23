import React from 'react';
import './Style.css';
import { Card, ListGroup } from 'react-bootstrap';
import { MyContext } from '../../App';
import NavBar from '../Shared/Navbar';
import PaginationComponent from '../Shared/Pagination';
import BookCard from './BookCard';
import { getAllBooks, getReadBooks, getWantBooks, getReadingBooks } from '../../API/User';

class UserHome extends React.PureComponent {
    state = {
        clickedFilter: 'All',
        userShowedBooks: [],
        error: ''
    }
    componentDidMount = () => {
        getAllBooks()
            .then(res => { this.setState({ userShowedBooks: res }) })
            .catch(err => { this.setState({ error: "server error" }) });
    }
    handleClick = (e) => {
        const name = e.target.name;
        if (name === "Read") {
            getReadBooks()
                .then(res => { this.setState({ userShowedBooks: res, clickedFilter: name }) })
                .catch(err => { this.setState({ error: "server error" }) });
        }
        else if (name === "All") {
            getAllBooks()
                .then(res => { this.setState({ userShowedBooks: res, clickedFilter: name }) })
                .catch(err => { this.setState({ error: "server error" }) });
        }
        else if (name === "Want To Read") {
            getWantBooks()
                .then(res => { this.setState({ userShowedBooks: res, clickedFilter: name }) })
                .catch(err => { this.setState({ error: "server error" }) });
        }
        else {
            getReadingBooks()
                .then(res => { this.setState({ userShowedBooks: res, clickedFilter: name }) })
                .catch(err => { this.setState({ error: "server error" }) });
        }

    }
    render() {
        return (
            <>

                <NavBar></NavBar>
                <div className='BooksListing'>

                    <ListGroup style={{ width: '20rem' }}>
                        <ListGroup.Item action name='All' onClick={this.handleClick}>
                            All
                                </ListGroup.Item>
                        <ListGroup.Item action name='Currently Reading' onClick={this.handleClick}>
                            curently Reading
                                  </ListGroup.Item>
                        <ListGroup.Item action name='Read' onClick={this.handleClick}>
                            Read
                                 </ListGroup.Item>
                        <ListGroup.Item action name='Want To Read' onClick={this.handleClick}>
                            want to read
                                </ListGroup.Item>
                    </ListGroup>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Card style={{ width: '15rem', marginLeft: '20px' }}>
                            <Card.Body>{this.state.clickedFilter}</Card.Body>
                        </Card>
                        <div style={{}}>
                            {

                                this.state.userShowedBooks.map(book => <BookCard key={book.bookId._id} {...book} clickedFilter={this.state.clickedFilter} />)

                            }
                        </div>
                        <PaginationComponent></PaginationComponent>
                    </div>
                </div>

            </>

        )
    }
}
export default UserHome;
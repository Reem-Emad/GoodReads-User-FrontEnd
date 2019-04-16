import React from 'react';
import './Style.css';

import { Card, ListGroup } from 'react-bootstrap';
import { MyContext } from '../../App';
import NavBar from '../Shared/Navbar';
import PaginationComponent from '../Shared/Pagination';
import BookCard from './BookCard';


class UserHome extends React.PureComponent {
    state = {
        showedBooks: [],
        showedBooksState: [],
        clickedFilter: 'All',
    }
    getAllBooks = (allBooks, Books) => {
        let books = [];
        allBooks.map(book => Books.find(element => {
            if (element.id === book.id)
                books.push(<BookCard key={element.id} {...element} state={book.state} ></BookCard>);
        }))
        return books;

    }
    handleClick = (loginedUser, Books) => (e) => {
        // debugger;
        let filter = e.target.name;
        this.setState({ clickedFilter: filter });
        let booksIDs = [];
        let states = [];
        if (filter === 'All') {
            // booksIDs=loginedUser.all;
            loginedUser.books.map(book => { booksIDs.push(book.id); states.push(book.state) });
        }
        else if (filter === 'Currently Reading') {
            // booksIDs=loginedUser.reading;
            loginedUser.books.map(book => {
                if (book.state === 'Reading') {
                    booksIDs.push(book.id);
                    states.push(book.state);
                }
            });


        }
        else if (filter === 'Read') {
            // booksIDs=loginedUser.read;
            loginedUser.books.map(book => {
                if (book.state === 'Read') {
                    booksIDs.push(book.id);
                    states.push(book.state);
                }
            });
        }
        else {
            // booksIDs=loginedUser.wantToRead;

            loginedUser.books.map(book => {
                if (book.state === 'Want To Read') {
                    booksIDs.push(book.id);
                    states.push(book.state);
                }
            });
        }
        let books = [];
        booksIDs.map(bookID => Books.find(element => {
            if (element.id === bookID)
                books.push(element);
        }))
        this.setState({ showedBooks: books, showedBooksState: states });
    }
    render() {
        return (

            <MyContext.Consumer>

                {value =>
                    (
                        <>

                            <NavBar></NavBar>
                            <div className='BooksListing'>

                                <ListGroup style={{ width: '20rem' }}>
                                    <ListGroup.Item action name='All' onClick={this.handleClick(value.state.loginedUser, value.state.Books)}>
                                        All
                </ListGroup.Item>
                                    <ListGroup.Item action name='Currently Reading' onClick={this.handleClick(value.state.loginedUser, value.state.Books)}>
                                        curently Reading
                 </ListGroup.Item>
                                    <ListGroup.Item action name='Read' onClick={this.handleClick(value.state.loginedUser, value.state.Books)}>
                                        Read
                 </ListGroup.Item>
                                    <ListGroup.Item action name='Want To Read' onClick={this.handleClick(value.state.loginedUser, value.state.Books)}>
                                        want to read
                 </ListGroup.Item>
                                </ListGroup>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <Card style={{ width: '15rem', marginLeft: '20px' }}>
                                        <Card.Body>{this.state.clickedFilter}</Card.Body>
                                    </Card>
                                    <div style={{}}>
                                        {

                                            this.state.showedBooks.length == 0 && value.state.loginedUser.books.length != 0 ?
                                                this.getAllBooks(value.state.loginedUser.books, value.state.Books)
                                                :

                                                this.state.showedBooks.map((book, index) => (<BookCard key={book.id} {...book} clickedFilter={this.state.clickedFilter} state={this.state.showedBooksState[index]}></BookCard>))


                                        }
                                    </div>
                                    <PaginationComponent></PaginationComponent>
                                </div>
                            </div>

                        </>
                    )
                }
            </MyContext.Consumer>
        )
    }
}
export default UserHome;
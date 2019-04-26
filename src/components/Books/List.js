import React from 'react';
import BasicCard from './Basic-Card';
import Navbar from '../Shared/Navbar';
import { Row } from 'react-bootstrap';
import { getBooks } from '../../API/Book';

class BooksList extends React.Component {
    state = {
        AllBooks: [],
        error: ""
    }
    componentDidMount() {
        getBooks()
            .then(res => {
                this.setState({ AllBooks: res });
            })
            .catch(err => {
                this.setState({ error: "server error" });

            })
    }
    render() {
        return (
            <>
                <Navbar></Navbar>
                <Row className="no-gutters">
                    {this.state.AllBooks.map(book => <BasicCard key={book._id} id={book._id}
                        cover={book.cover} title={book.title} author={book.author} >
                    </BasicCard>)
                    }
                </Row>
            </>
        )

    }
}
export default BooksList;

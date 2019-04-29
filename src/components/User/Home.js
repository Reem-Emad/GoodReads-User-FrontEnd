import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { getUserBooks } from '../../API/User';
import NavBar from '../Shared/Navbar';
import PaginationComponent from '../Shared/Pagination';
import BookCard from './BookCard';
import './Style.css';

class UserHome extends React.PureComponent {
    state = {
        clickedFilter: 'All',
        userShowedBooks: [],
        pageOfItems: [],
        error: '',

    }
    componentDidMount = () => {
        const status = "all";
        getUserBooks({ status })
            .then(res => {

                this.setState({ userShowedBooks: res })
            })
            .catch(err => { this.setState({ error: "server error" }) });
    }
    handleClick = (e) => {
        const status = e.target.name;
        getUserBooks({ status })
        .then(res => {
            this.setState({ userShowedBooks: res })
        })
        .catch(err => { this.setState({ error: "server error" }) });
        this.setState({ clickedFilter: status })

    }
    onChangePage = (pageOfItems) => {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
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

                                this.state.pageOfItems.map(book => <BookCard key={book.bookId._id} {...book} clickedFilter={this.state.clickedFilter} />)

                            }
                            <PaginationComponent items={this.state.userShowedBooks} onChangePage={this.onChangePage}></PaginationComponent>
                        </div>

                    </div>
                </div>

            </>

        )
    }



}
export default UserHome;
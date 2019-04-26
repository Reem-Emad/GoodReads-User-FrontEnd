import React from 'react';
import BasicCard from './Basic-Card'
import { Row } from 'react-bootstrap';
import { getBooks } from '../../API/Book'

class BooksList extends React.Component {
    state = {
        AllBooks: []
    }
    componentDidMount() {
        getBooks()
            .then(res => {
                this.setState({ AllBooks: res });
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        return (
            <>
                {/* <Navbar></Navbar> */}
                <Row className="no-gutters">
                    {this.state.AllBooks.map(b => <BasicCard key={b._id} id={b._id}
                        cover={b.cover} title={b.title} author={b.author} authorData={b.authorData}>
                    </BasicCard>)
                    }
                </Row>
            </>
        )

    }
}
export default BooksList;

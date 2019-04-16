import React from 'react';
import BasicCard from './Basic-Card'
import Navbar from '../Shared/Navbar';
import {Row} from 'react-bootstrap';
import {MyContext} from '../../App';


class BooksList extends React.Component {
    render() {
        return (
            <MyContext.Consumer>
                {value=>(
            <>
            <Navbar></Navbar>
            <Row className="no-gutters">
                {value.state.Books.map(b => <BasicCard key={b.id} id={b.id}
                   cover={b.cover} title={b.title} author={b.author} >
                </BasicCard>)
            }
            </Row>
            </>
                )}
            </MyContext.Consumer>
        )

    }
}
export default BooksList;

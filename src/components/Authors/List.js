import React from 'react';
import Navbar from '../Shared/Navbar';
import BasicCard from './Basic-card';
import { Row } from 'react-bootstrap';
import { getAuthors } from '../../API/Author'
class AllAuthors extends React.Component {
    state = {
        AllAuthor: [],
        error: ""
    }
    componentDidMount() {
        getAuthors()
            .then(res => {
                this.setState({ AllAuthor: res });
            })
            .catch(err => {
                this.setState = { error: "Server Error" }
            })

    }
    render() {
        return (
            <>
                <Navbar></Navbar>
                <Row className="no-gutters">
                    {
                        this.state.AllAuthor.map(author => <BasicCard key={author.id} id={author._id} image={author.Image} name={author.FullName} />)

                    }
                </Row>


            </>
        )
    }
}
export default AllAuthors;
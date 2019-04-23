import React from 'react';
import Navbar from '../Shared/Navbar';
import BasicCard from './Basic-card';
import { Row } from 'react-bootstrap';
import { getAuthors } from '../../API/Author'
class AllAuthors extends React.Component {
    state = {
        AllAuthor: []
    }
    componentDidMount() {
        getAuthors()
            .then(res => {
                this.setState({ AllAuthor: res });
                // console.log(this.state.AllAuthor)
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
                    {
                        this.state.AllAuthor.map((a) => <BasicCard key={a.id} id={a._id} image={a.Image} name={a.FullName} />)

                    }
                </Row>


            </>
        )
    }
}
export default AllAuthors;
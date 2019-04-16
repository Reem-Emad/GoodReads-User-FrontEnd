import React from 'react';
import authors from '../../Authors';
import Navbar from '../Shared/Navbar';
import BasicCard from './Basic-card';
import { Row } from 'react-bootstrap';
class AllAuthors extends React.Component {
    render() {
        return (
            <>
               <Navbar></Navbar>
                <Row className="no-gutters">
                    {
                        authors.map((a) => <BasicCard key={a.id} id={a.id} image={a.Image} name={a.Name} />)
                    }
                </Row>
            </>
        )
    }
}
export default AllAuthors;
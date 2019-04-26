import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
import { getAuthors } from '../../API/Author';
import Navbar from '../Shared/Navbar';
class BasicCard extends React.Component {
    getAuthor = () => (e) => {
        console.log(this.props)
        if (this.props.authorData != undefined && this.props.authorData.length > 0 && this.props.authorData[0]._id != undefined)
            this.props.history.push(`/AuthorDetailes/${this.props.authorData[0]._id}`);
        else {
            return <h2>Not Fount these author</h2>
        }
    }
    render() {

        return (
            <>

                <Col key={this.props.id} className="m-3">
                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src={this.props.cover} style={{ height: '10rem' }} />
                        <Card.Body>
                            <Link to={`/bookDetailes/${this.props.id}`}>
                                <Card.Title>{this.props.title} </Card.Title>
                            </Link>

                            <Card.Text onClick={this.getAuthor().bind(this)} style={{ textDecoration: 'underline', color: '#009CDA', cursor: 'pointer' }}>{this.props.author} </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>



            </>
        )

    }
}
export default withRouter(BasicCard);
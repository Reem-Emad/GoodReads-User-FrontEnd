import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class BasicCard extends React.Component {
    render() {
        return (

            <Col key={this.props.id} className="m-2" >
                <Card style={{ width: '15rem' }}>
                    <Card.Img variant="top" src={this.props.image} style={{ height: '15rem' }} />
                    <Card.Body>
                        <Link to={`/AuthorDetailes/${this.props.id}`}>
                            <Card.Title>{this.props.name}</Card.Title>
                        </Link>
                    </Card.Body>
                </Card>
            </Col>

        );
    }

}

export default BasicCard;


import React from 'react';
import Authors from '../../Authors';
import { Link, withRouter } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
class BasicCard extends React.Component {

    getAuthor = (name) => (e) => {

        const author = Authors.find(element => {
            if (element.Name === name)
                return element;
        })
        this.props.history.push(`/authorDetailes/${author.id}`);

    }
    render() {

        return (
            <>

                <Col key={this.props.id} className="m-3">
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={this.props.cover} style={{ height: '20rem' }} />
                        <Card.Body>
                            <Link to={`/bookDetailes/${this.props.id}`}>
                                <Card.Title>{this.props.title} </Card.Title>
                            </Link>
                            By:
                                <Card.Text onClick={this.getAuthor(this.props.author)} style={{ textDecoration: 'underline', color: '#009CDA', cursor: 'pointer' }}>{this.props.author} </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>



            </>
        )

    }
}
export default withRouter(BasicCard);
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
import { getAuthors } from '../../API/Author';
import Navbar from '../Shared/Navbar';
class BasicCard extends React.Component {

    state = {
        Authors: []
    }
    componentDidMount() {
        getAuthors()
            .then(res => {
                this.setState({ Authors: res });
            })
            .catch(err => {
                console.log(err)
            })

    }
    getAuthor = (name) => (e) => {
        const author = this.state.Authors.find(element => {

            if (element.FullName === name)
                return element;
        })
        if (author != undefined)
            this.props.history.push(`/AuthorDetailes/${author._id}`);
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
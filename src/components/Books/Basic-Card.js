import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
import { getBooksById } from '../../API/Book';
import Navbar from '../Shared/Navbar';
class BasicCard extends React.Component {
    getAuthor = (e) => {

        if (this.props.authorData != undefined && this.props.authorData.length > 0 && this.props.authorData[0]._id != undefined)
            this.props.history.push(`/AuthorDetailes/${this.props.authorData[0]._id}`);
        else {
            getBooksById(this.props.id)
                .then(res => { this.props.history.push(`/AuthorDetailes/${res.authorData[0].id}`); })
                .catch(err => { })
            return (
                <>
                </>
            )
        }
    }
    render() {

        return (
            <>

                {/* <Col key={this.props.id} className="m-2"> */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <Card style={{ width: '15rem', margin: "7px" }}>
                        <Card.Img variant="top" src={this.props.cover} style={{ height: '15rem' }} />
                        <Card.Body>
                            <Link to={`/bookDetailes/${this.props.id}`}>
                                <Card.Title>{this.props.title} </Card.Title>
                            </Link>

                            <Card.Text onClick={this.getAuthor} style={{ textDecoration: 'underline', color: '#009CDA', cursor: 'pointer' }}>{this.props.author} </Card.Text>
                        </Card.Body>
                    </Card>
                    {/* </Col> */}
                </div>



            </>
        )

    }
}
export default withRouter(BasicCard);
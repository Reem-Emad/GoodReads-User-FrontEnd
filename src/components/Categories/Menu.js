import React from 'react';
import categories from '../../Categories';
import Navbar from '../Shared/Navbar';
import { Dropdown, Row, Container, Col } from 'react-bootstrap';
import './Style.css';
import ListByCategory from '../Books/ListByCategory';
class Categories extends React.Component {
    state = {
        selectedCategory: '',
        NumberOfBooks: 0,
    }
    selectedCategory = (j) => (e) => {
        this.setState({ selectedCategory: j });
    }
    render() {
        let eventKey = 1;
        return (
            <>
                <Navbar></Navbar>
                <Container className="Container">
                    <Row>

                    </Row>
                    <Row>
                        <Col sm="1"></Col>
                        <Col sm="2">
                            <Dropdown.Menu show>
                                <Dropdown.Header>Favorite Genres:</Dropdown.Header>
                                {
                                    categories.map((c) => { eventKey = eventKey + 1; return (<div key={c.Id}><Dropdown.Item onClick={this.selectedCategory(c.Name)} eventKey={eventKey}>{c.Name}</Dropdown.Item> </div>) })
                                }
                            </Dropdown.Menu>
                        </Col>
                        <Col sm="9">

                            {this.state.selectedCategory}
                            <br></br>
                            {
                                <ListByCategory selectedCategory={this.state.selectedCategory} />
                            }


                        </Col>

                    </Row>

                </Container>

            </>
        )
    }
}
export default Categories;
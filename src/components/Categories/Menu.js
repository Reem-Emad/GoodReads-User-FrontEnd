import React from 'react';
import categories from '../../Categories';
import Navbar from '../Shared/Navbar';
import { Dropdown, Row, Container, Col } from 'react-bootstrap';
import './Style.css';
import ListByCategory from '../Books/ListByCategory';
import { getCategories, getCategoriesById } from '../../API/Category';
class Categories extends React.Component {
    state = {
        booksForselectedCategory: [],
        NumberOfBooks: 0,
        allCategory: []
    }
    selectedCategory = (j) => (e) => {
        this.setState({ booksForselectedCategory: j });
    }
    componentDidMount() {
        getCategories()
            .then(res => {
                this.setState({ allCategory: res });
            })
            .catch(err => {
                console.log(err)
            })
    }
    render() {
        console.log(this.state.allCategory)
        if (this.state.allCategory.length > 0) {
            let eventKey = 1;
            return (
                <>
                    {/* <Navbar></Navbar> */}
                    <Container className="Container">
                        <Row>

                        </Row>
                        <Row>
                            <Col sm="1"></Col>
                            <Col sm="2">
                                <Dropdown.Menu show>
                                    <Dropdown.Header>Favorite Genres:</Dropdown.Header>
                                    {
                                        this.state.allCategory.map((c) => { eventKey = eventKey + 1; return (<div key={c._id}><Dropdown.Item onClick={this.selectedCategory(c)} eventKey={eventKey}>{c.name}</Dropdown.Item> </div>) })
                                    }
                                </Dropdown.Menu>
                            </Col>
                            <Col sm="9">
                                <br></br>
                                {
                                    <ListByCategory books={this.state.booksForselectedCategory.bookData} />
                                }


                            </Col>

                        </Row>

                    </Container>

                </>
            )
        }
        else {
            return (
                <>
                </>
            )
        }
    }
}
export default Categories;
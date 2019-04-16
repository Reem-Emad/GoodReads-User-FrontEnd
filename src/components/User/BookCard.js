import React from 'react';
import { Card,Dropdown } from 'react-bootstrap';
import {  withRouter } from 'react-router-dom';
import Books from '../../Books';
import Authors from '../../Authors';

import './Style.css';

class UserBookCard extends React.PureComponent {
   
    displayStars=(rating)=>
    {
        
       let avgRatingstars=[];
        for(var i=0;i<rating;i++)
        {
            avgRatingstars.push(<i key={i} className="fas fa-star checked"></i>);
        }
        return avgRatingstars;
    }
    getBook=(title)=>(e)=>{
        const book= Books.find(element => {
            if(element.title===title)
               return element;
        })
        this.props.history.push(`/bookDetailes/${book.id}`);
            
    }
    getAuthor=(name)=>(e)=>{
        const author= Authors.find(element => {
            if(element.Name===name)
               return element;
        })
        this.props.history.push(`/authorDetailes/${author.id}`);
            
    }
    render() {
        const { title,author,rating,cover,state } = this.props;

         
         let otherFilters=[];
         if(state==='Read')
         otherFilters.push({id:3,state:'Want To Read'},{id:1,state:'Reading'})
         else if(state==='Want To Read') 
         otherFilters.push({id:2,state:'Read'},{id:1,state:'Reading'})
         else
         otherFilters.push({id:3,state:'Want To Read'},{id:2,state:'Read'})


        return (
            <>
                <Card className="BookCard">
                    <Card.Img variant="top" src={cover} className="BookCard_img" />
                    <Card.Body>
                        <Card.Text style={{marginRight:'10px',textDecoration:'underline',cursor: 'pointer'}}  onClick={this.getBook(title)} ><span style={{marginRight:'3px',color:'#58371F',fontWeight:'Bold'  }}>Title: </span>{title}</Card.Text>
                        <Card.Text style={{marginRight:'10px',textDecoration:'underline',cursor: 'pointer'}}  onClick={this.getAuthor(author)}><span style={{marginRight:'3px',color:'#58371F',fontWeight:'Bold'}}>Author: </span>{author}</Card.Text>
                        <Card.Text style={{marginRight:'10px'}} ><span style={{marginRight:'3px',color:'#58371F',fontWeight:'Bold'}}>AVG Rating: </span> {
                            this.displayStars(rating)
                          
                            }
                        
                        </Card.Text>
                        <Card.Text style={{marginRight:'10px'}}>
                        <span style={{marginRight:'3px',color:'#58371F',fontWeight:'Bold'}}>Rating:</span>
                         <i className="fas fa-star checked"></i>
                         <i className="fas fa-star checked"></i>
                         <i className="fas fa-star checked"></i>
                         <i className="fas fa-star checked"></i>
                         <i className="fas fa-star checked"></i>
                         </Card.Text>
                      
                        <Dropdown  >
                            <Dropdown.Toggle variant="success" id="dropdown-basic" className="BookCars_dropdown--btn">
                               {state}
                            </Dropdown.Toggle>

                            <Dropdown.Menu className='BookCars_dropdown--list'>
                            {
                                otherFilters.map(filter=> (<Dropdown.Item key={filter.id} className='BookCars_dropdown--listItem'>{filter.state}</Dropdown.Item>))
                            }
                            </Dropdown.Menu>
                         
                        </Dropdown>
                    </Card.Body>
                </Card>
            </>
        )
    }
}
export default withRouter(UserBookCard);
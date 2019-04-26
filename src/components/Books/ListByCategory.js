import React from 'react';
import books from '../../Books';
import Book from './Basic-Card';
class AllBooks extends React.Component {
    render() {
        if (this.props.books != undefined) {
            return (
                <>
                      {  console.log(this.props.books)}
                    {
                        this.props.books.map(b => <div style={{ display: 'inline', margin: '20px' }} key={b._id} >
                        <Book id={b._id} cover={b.cover} title={b.title} author={b.author} authorData={b.authorData} />

                    </div>)
                }
                </>
            )
        }
        else {
            return (
                <>
                    <h2>There is No Books For these author</h2>
                </>
            )
        }
    }
}
export default AllBooks;

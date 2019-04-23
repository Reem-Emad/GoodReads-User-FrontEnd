import React from 'react';
import { getBooks } from '../../API/Book';
import BasicCard from './Basic-Card';
class AuthorBooks extends React.Component {
    state = {
        books: []
    }
    componentDidMount() {
        getBooks()
            .then(res => {
                this.setState({ books: res })
            })
            .catch(err => {
                console.log(err)
            })

    }
    render() {
        return (
            <>
                {

                    this.state.books.filter(b => (b.author === this.props.match.params.name)).map(b => <div style={{ display: 'inline', margin: '20px' }} key={b._id} >
                        <BasicCard id={b._id} cover={b.cover} title={b.title} author={b.author} />

                    </div>)
                }
            </>
        )
    }
}
export default AuthorBooks;

import React from 'react';
import { getBooks } from '../../API/Book';
import BasicCard from './Basic-Card';
class AuthorBooks extends React.Component {
    // state = {
    //     books: []
    // }
    // componentDidMount() {
    //     getBooks()
    //         .then(res => {
    //             this.setState({ books: res })
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })

    // }
    render() {
        if (this.props.books != undefined) {
            return (
                <>
                    {

                        this.props.books.map(b => <div style={{ display: 'inline', margin: '10px' }} key={b._id} >
                            <BasicCard id={b._id} cover={b.cover} title={b.title} author={''} />

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
export default AuthorBooks;

import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

///font awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
/////components
import HomePage from './components/SignIn-SignUp/Home_Page';
import UserHome from './components/User/Home';
import Categories from './components/Categories/Menu';
import BooksList from './components/Books/List';
import AuthorDetails from './components/Authors/Details';
import BookDetailes from './components/Books/BookDetails';
import AllAuthors from './components/Authors/List';
import Authors from './Authors';
import Books from './Books';
import Users from './Users';
import getBooksByAuthors from './components/Books/ListByAuthor';

library.add(faEdit);
library.add(faTrashAlt);
library.add(faPlus);

export const MyContext = React.createContext({ users: Users });
class App extends React.PureComponent {
    state = {
        loggedInUser: {}
    }
    addLoggedInUser = (loggedInUser) => {
        this.setState({ loggedInUser }, () => { console.log(this.state.loggedInUser) });
    }
    render() {
        const value = {
            state: this.state,
            addLoggedInUser: this.addLoggedInUser,

        }


        // if (Object.keys(this.state.loggedInUser).length == 0)
        //     return (
        //         <MyContext.Provider value={value}>
        //             <Router>

        //                 {/* <Route exact to="/" component={HomePage}></Route> */}

        //             </Router>
        //         </MyContext.Provider>
        //     )


        return (
            <>

                <MyContext.Provider value={value}>
                    <Router>
                        <Switch>
                            {/* <Route exact path="/" component={HomePage} />
                            <Route exact path="/user/home" component={UserHome} />
                            <Route exact path="/user/categories" component={Categories} />
                        <Route exact path="/user/authors" component={AllAuthors} />*/}
                            <Route exact path="/user/books" component={BooksList} />
                            <Route exact path="/booksByAuthors/:name" component={getBooksByAuthors} />
                            <Route exact path="/bookDetailes/:id" component={BookDetailes} />
                            <Route exact path="/AuthorDetailes/:id" component={AuthorDetails} />
                            <Route exact path="/authors" component={AllAuthors} />

                        </Switch>

                    </Router>
                </MyContext.Provider>
            </>
        )
    }
}
export default App;





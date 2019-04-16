import React from 'react';
import SignIn from './SignIn_Form';
import SignUp from './SignUp_Form';
import './Style.css';

const HomePage = props => {
    return(
    <>
    <div className="HomePage">
    <SignIn/>
    <SignUp/>
    </div>
    </>
    )
}
export default HomePage;
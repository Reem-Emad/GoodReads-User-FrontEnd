import React from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Image } from 'react-bootstrap';
import { MyContext } from '../../App';
import { login } from '../../API/User';
import Logo from '../../images/logo.png';
import './Style.css';

class SignIn extends React.PureComponent {

    state = {
        email: '',
        password: '',
        enteredDataValidation: ''
    }
    handleSubmit = (addLoggedInUser) => (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        if (email === '' && password === '')
            this.setState({ enteredDataValidation: 'Enter email and password please' })
        else if (password === '')
            this.setState({ enteredDataValidation: 'Enter password please' })
        else if (email === '')
            this.setState({ enteredDataValidation: 'Enter email please' })

        else {
            login({ email, password })
                .then(res => {

                    localStorage.setItem('userToken', res.token);
                    addLoggedInUser(res.profile);
                    alert('loggedin')
                })
                .catch(err => {

                    this.setState({ enteredDataValidation: 'Incorrect mail or password' })
                })
        }


    }
    handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        this.setState({ [key]: value })
    }


    render() {
        return (
            <MyContext.Consumer>

                {value =>
                    (
                        <>
                            <Navbar expand="lg" className="HomePage_Navbar">
                                <Navbar.Brand style={{ marginLeft: '50px' }}><Image src={Logo} /></Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Form inline className="SignIn_Form" onSubmit={this.handleSubmit(value.addLoggedInUser)}>
                                        <Form.Group className="mr-2" >
                                            <Form.Control type="email" name='email' placeholder="Enter email" onChange={this.handleChange} value={this.state.email} />
                                        </Form.Group>
                                        <Form.Group className="mr-2" >
                                            <Form.Control type="password" name='password' placeholder="Password" onChange={this.handleChange} value={this.state.password} />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" className="mr-2 SignIn_form-btn">
                                            Sign in
                                          </Button>
                                        <Form.Text style={{ color: 'darkred', fontWeight: 'bold' }}>{this.state.enteredDataValidation}</Form.Text>
                                    </Form>

                                </Navbar.Collapse>
                            </Navbar>
                        </>
                    )
                }
            </MyContext.Consumer>
        )
    }
}

export default withRouter(SignIn);
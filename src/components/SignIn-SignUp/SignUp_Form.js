import React from 'react';
import SimpleSchema from 'simpl-schema';
import PopupMsg from '../Shared/PopupMsg';
import { MyContext } from '../../App';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { register } from '../../API/User';
import './Style.css';

class SignUp extends React.PureComponent {
    state = {
        FName: '',
        LName: '',
        email: '',
        password: '',
        repeatedPassword: '',
        image: null,
        error: [{ name: '', msg: '' }],
        showModal: false
    }
    showModal = () => {
        this.setState({ showModal: true });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    }
    handleSubmit = () => (e) => {
        e.preventDefault();
        const { FName, LName, email, password, repeatedPassword, image } = this.state;
        const validationContext = new SimpleSchema({
            FName: { type: String, min: 1, regEx: /^[a-z-A-Z_]{1,15}$/ },
            LName: { type: String, min: 1, regEx: /^[a-z-A-Z_]{1,15}$/ },
            email: SimpleSchema.RegEx.EmailWithTLD,
            password: { type: String, min: 1 },
            repeatedPassword: { type: String, min: 1 },
            // image: { type: String, defaultValue: 'N/A' }
        }).newContext();

        validationContext.validate({ FName, LName, email, password, repeatedPassword });
        const errors = [];
        // this.setState({ error: errors })
        validationContext.validationErrors().map(e => {

            if (e.type === 'regEx' && e.name !== 'email')
                errors.push({ name: e.name, msg: 'must be charachters only' })
            else if (e.type === 'regEx' && e.name === 'email' && e.value !== '')
                errors.push({ name: e.name, msg: 'email not valid' })
            else if (e.name === 'email' && e.value === '')
                errors.push({ name: e.name, msg: 'required' })
            else {

                errors.push({ name: e.name, msg: 'required' })
            }
        });

        if (repeatedPassword !== password)
            errors.push({ name: 'repeatedPassword', msg: 'Not matched with password' });

        errors.length !== 0 ?
            this.setState({ error: errors })
            :
            register({ name: { fname: FName, lname: LName }, email, password, image })
                .then(res => {

                    this.showModal();
                    this.setState({ FName: '', LName: '', email: '', password: '', repeatedPassword: '', image: null, error: [{ name: '', msg: '' }] })
                })
                .catch(err => {

                    if (err.response.data.message.includes("duplicate key") || err.response.data.message.includes("status code 400"))
                        errors.push({ name: 'email', msg: 'this email used before' })
                    this.setState({ error: errors });
                });
    }
    handleChange = (e) => {
        e.preventDefault();
        const key = e.target.name;
        if (key !== 'image') {
            const value = e.target.value;
            this.setState({ [key]: value });
        }
        else {

            this.setState({ image: e.target.files[0] }, () => { console.log(this.state.image) })
        }
    }
    render() {
        return (
            <MyContext.Consumer>

                {value =>
                    (
                        <>
                            <PopupMsg show={this.state.showModal} onHide={this.hideModal} msg="Done" />
                            <div style={{ height: '560px' }}>

                                <Form className='SignUp_form' onSubmit={this.handleSubmit()}>
                                    <Form.Text className="text-muted SignUp_form-text">
                                        New Here? Create a free account!
                    </Form.Text>
                                    <Form.Group>
                                        <Form.Control type="text" name='FName' placeholder="First name" value={this.state.FName} onChange={this.handleChange} />
                                        <Form.Text style={{ color: 'darkred', fontWeight: 'bold' }}>{
                                            this.state.error.map(e => {
                                                if (e.name === 'FName')
                                                    return e.msg
                                            })
                                        }
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Control type="text" name='LName' placeholder="Last name" value={this.state.LName} onChange={this.handleChange} />
                                        <Form.Text style={{ color: 'darkred', fontWeight: 'bold' }}>{
                                            this.state.error.map(e => {
                                                if (e.name === 'LName')
                                                    return e.msg
                                            })
                                        }
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Control type="text" name='email' placeholder="Enter email" value={this.state.email} onChange={this.handleChange} />
                                        <Form.Text style={{ color: 'darkred', fontWeight: 'bold' }}>{
                                            this.state.error.map(e => {
                                                if (e.name === 'email')
                                                    return e.msg
                                            })
                                        }
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group >
                                        <Form.Control type="password" name='password' placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                                        <Form.Text style={{ color: 'darkred', fontWeight: 'bold' }}>{
                                            this.state.error.map(e => {
                                                if (e.name === 'password')
                                                    return e.msg
                                            })
                                        }
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group >
                                        <Form.Control type="password" name='repeatedPassword' placeholder="Retype Password" value={this.state.repeatedPassword} onChange={this.handleChange} />
                                        <Form.Text style={{ color: 'darkred', fontWeight: 'bold' }}>{
                                            this.state.error.map(e => {
                                                if (e.name === 'repeatedPassword')
                                                    return e.msg
                                            })
                                        }
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group style={{ display: 'flex' }}>
                                        <Form.Control type="file" name='image' placeholder="upload Image" className="ImageUpload" onChange={this.handleChange} />

                                    </Form.Group>
                                    <Button variant="primary" type="submit" className='SignUp_form-btn'>
                                        Sign up
                          </Button>
                                </Form>
                            </div>
                        </>
                    )
                }
            </MyContext.Consumer>
        )
    }
}

export default SignUp;
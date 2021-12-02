import { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUser } from '../../redux/reducer'
import './Landing.scss'
import logo from '../../img/logo.png'
//Styling Imports
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import 'fontsource-roboto';



class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            verPassword: '',
            profilePicture: '',
            registerView: false
        }
    }

    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleToggle = () => {
        this.setState({ registerView: !this.state.registerView })
    }

    handleRegister = () => {
        const { username, email, password, verPassword, profilePicture } = this.state

        if (password && password === verPassword) {
            axios.post('/api/register', { username, email, password, profilePicture })
                .then(res => {
                    this.props.getUser(res.data)
                    this.props.history.push('/dash')
                })
                .catch(err => console.log(err))
        } else {
            alert("Passwords don't match")
        }
    }

    handleLogin = () => {
        const { email, password } = this.state

        axios.post('/api/login', { email, password })
            .then(res => {
                this.props.getUser(res.data)
                this.props.history.push('/dash')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className='landing'>
                <div className='landing-container'>
                    <section className='authentication-info'>
                        <img className='header-logo' src={logo}/>
                        <h1>Welcome to Restaurant Finder</h1>
                        {this.state.registerView
                            ? (
                                <>
                                    <h3>Register Below</h3>
                                    <TextField
                                        value={this.state.username}
                                        name='username'
                                        label='Username'
                                        onChange={e => this.handleInput(e)} />
                                </>
                            )
                            : <h3>Login Below</h3>}
                        <TextField
                            value={this.state.email}
                            name='email'
                            label='Email'
                            onChange={e => this.handleInput(e)} />
                        <TextField
                            value={this.state.password}
                            name='password'
                            type='password'
                            label='Password'
                            onChange={e => this.handleInput(e)} />
                        {this.state.registerView
                            ? (
                                <>
                                    <TextField
                                        value={this.state.verPassword}
                                        name='verPassword'
                                        type='password'
                                        label='Verify Password'
                                        onChange={e => this.handleInput(e)} />
                                    <TextField
                                        value={this.state.profilePicture}
                                        name='profilePicture'
                                        label='Profile Picture URL'
                                        onChange={e => this.handleInput(e)} />
                                    <Button variant='contained' onClick={this.handleRegister}>Register</Button>
                                    <p>Have an account? <span className='register-here'onClick={this.handleToggle}>Login here</span></p>
                                </>
                            )
                            : (
                                <>
                                    <Button variant='contained' onClick={this.handleLogin}>Login</Button>
                                    <p>Don't have an account? <span className='register-here' onClick={this.handleToggle}>Register here</span></p>
                                </>
                            )}
                    </section>
                </div>
            </div>
            
        )
    }
}

export default connect(null, { getUser })(Landing)

// import React, {userState, useEffect} from 'react'
// import axios from 'axios'

// const Landing = (props) => {
//     return (
//         <section>
//             Landaing
//         </section>
//     )
// }

// export default Landing

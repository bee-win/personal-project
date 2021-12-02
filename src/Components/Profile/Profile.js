import axios from 'axios'
import React, {userState, useEffect, useState} from 'react'
import Header from '../Header/Header'
import { connect } from 'react-redux'
import { getUser, clearUser } from '../../redux/reducer'
import Button from '@material-ui/core/Button'
import 'fontsource-roboto'
import './Profile.scss'
import defaultPic from '../../img/default-profile-pic.jpg'
import { TextField } from '@material-ui/core'

const Profile = (props) => {
    const [username, setUsername] = useState('')
    const [editView, setEditView] = useState(false)

    const handleInput = (val) => {
        setUsername(val)
    }

    const handleEditView = () => {
        setEditView(!editView)
    }

    const updateUsername = () => {
        axios.put(`/api/user/${props.user.user_id}`, { username: username })
            .then(res => {
                props.getUser(res.data[0])
                handleEditView()
                setUsername('')
            })
            .catch(err => console.log(err))
    }

    const handleLogout = () => {
        axios.get('/api/logout')
          .then(() => {
              props.clearUser()
              props.history.push('/')
          })
          .catch(err => console.log(err))
    }

    console.log(props)
    return (
        <section className='profile'>
           <Header />
           <section className='profile-flex-box'>
               <section className='profile-container'>
                    {!editView
                            ? (
                            <div className='edit-user-container'>
                                <img className='profile-pic' src={defaultPic}/>
                                <h2>Welcome to your profile</h2>
                                <h4>Username: {props.user.username}</h4>
                                <Button className='edit-button' variant='contained' onClick={()=> setEditView(!editView)}>Edit Username</Button>
                            </div>
                            )
                            : (
                            <div>
                                <TextField
                                value={username}
                                placeholder='New Username'
                                onChange={e => setUsername(e.target.value)} />
                                <Button variant='contained' onClick={updateUsername} id='edit-btn'>Submit</Button>
                            </div>
                        )}
                        <h4>Email: {props.user.email}</h4>
                        <Button variant='contained' onClick={handleLogout}>Logout</Button>
               </section>
           </section>
        </section>
    )
}

const mapStateToProps = reduxState => reduxState
export default connect(mapStateToProps, { getUser, clearUser})(Profile)
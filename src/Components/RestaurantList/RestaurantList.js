import React, {userState, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'
import Header from '../Header/Header'
import { getUser } from '../../redux/reducer'
//Styling Imports
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Snackbar from '@material-ui/core/Snackbar'
import 'fontsource-roboto'
import './RestaurantList.scss'

const RestaurantList = (props) => {
    const {user_id, username} = props
    const [restaurants, setRestaurants] = useState([])
    const [listView, setListView] = useState(false)
    const [deleteClicked, setDeleteClicked] = useState(false)

    useEffect(() => {
        console.log('User ID: ', props)

        axios.get(`/api/saved-restaurants/${user_id}`)
            .then((res) => {
                res.data.map((element, index)=> {
                    restaurants.push(element)
                })
            })
            .catch(err => console.log('restaurantList axios get error: ',err))  
            
        console.log('restaurants array is : ', restaurants)
    }, [deleteClicked])

    const toggleList = () => {
        setListView(!listView)
    }

    const toggleDeleteClicked = () => {
        setDeleteClicked(!deleteClicked)
    }

    const handleDelete = (restaurantId) => {
        axios.delete(`/api/saved-restaurants/${user_id}&${restaurantId}`)
            .then(() => console.log(`deleted ${user_id}'s ${restaurantId}`))
            .catch(err => console.log(`delete failed: ${err}`))
        setDeleteClicked(!deleteClicked)
    }

    const handleEmail = () => {
        axios.post('/api/email')
            .then(() => console.log('email sent'))
            .catch(err => console.log(`handleEmail failed: ${err}`))
    }

    return(
        <div className='restaurant-list'>
            <Header />
            <section className='restaurant-list-flex-box'>
                <section className='restaurant-list-container'>
                    {/* <Button variant='contained' >Email Saved Restaurants</Button> */}
                    {listView
                    ? (
                        <>
                            {restaurants.map((element, index)=> {
                                return <div className='restaurant'>
                                        <img className='restaurant-image' src={element.restaurant_img}/>
                                        <h2 key={index}>{element.restaurant_name}</h2>
                                        <h4 className='rating'>Rating: {element.rating}/5</h4>
                                        <h4 className='rating'>Price: {element.price}</h4>
                                        <Button className='delete-btn' variant='contained' onClick={()=> {handleDelete(element.restaurant_id)}}>Delete</Button>
                                    </div>
                            })}
                            <div>
                                <TextField
                                    name='email'
                                    label='Email'                                   
                                />
                                <Button variant='contained' onClick={handleEmail}>Email List</Button>

                            </div>
                            <Button variant='contained' onClick={() => props.history.push('/dash')}>Back</Button>
                        </>
                    ): 
                    (
                    <>
                        <h1>Hello, {username}</h1>
                        <Button variant='contained' onClick={toggleList}>Display Saved Restaurants</Button>
                    </>
                    )}

                </section>
            </section>

        </div>
    )
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.user.user_id,
        username: reduxState.user.username
    }
}
export default connect(mapStateToProps, {getUser})(RestaurantList)

//rate-limiting, problem with asynchronous requests when it comes to getting restaurant info from axios requests (error 429). Had to switch to a db approach rather than calling individual api requests for each restaurant
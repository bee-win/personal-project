import axios from 'axios'
import React, {userState, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import Header from '../Header/Header'
//Styling Imports
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import 'fontsource-roboto'
import './Restaurant.scss'

// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />
// }

const Restaurant = (props) => {
    const [restaurant, setRestaurant] = useState(props.location.state.element)
    const [photos, setPhotos] = useState([])
    const [open, setOpen] = useState(false)
    const [location, setLocation] = useState('')


    useEffect(() => {
        console.log('location is: ',location)
        axios.get(`/api/restaurant/${restaurant.id}`)
            .then(res=>{
                setPhotos(res.data.photos)
            })
    }, [])

    const handleAddRestaurant = () => {
        axios.post('/api/addRestaurant', 
                    {userId: props.user_id,
                     restaurantId: restaurant.id,
                     restaurantUrl: restaurant.url,
                     restaurantName: restaurant.name,
                     restaurantImg: restaurant.image_url,
                     phone: restaurant.display_phone,
                     rating: restaurant.rating,
                     reviewCount: restaurant.review_count,
                     address1: restaurant.location.address1,
                     city: restaurant.location.city,
                     zipCode: restaurant.location.zip_code,
                     country: restaurant.location.country,
                     state: restaurant.location.state,
                     price: restaurant.price})
            .then(() => {
                alert('Restaurant has been added!')
                console.log(props.user_id, restaurant.id)
            })
            .catch(err => console.log(err))
    }

    console.log({restaurant})
    return (
        <div className='restaurant-info'>
            <Header/>
            <section className='restaurant-info-flex-box'>
                <section className='restaurant-info-box-1'>
                    <section className='restaurant-info-container'>
                        <h1>{restaurant.name}</h1>
                        <img className='restaurant-image' src={restaurant.image_url}/>
                        <div className='price-open-container'>
                            {restaurant.is_closed
                            ? (
                                <h4 className='closed'>Closed</h4>
                            )
                            : (
                                <h4 className='open'>Open</h4>
                            )}
                            <div className='price-container'> 
                                <h4 >Price:</h4>
                                <h4 className='price'>{restaurant.price}</h4>
                            </div>
                        </div>
                        <section className='restaurant-address-container'>
                            <h5>
                                {restaurant.location.display_address.map((element, index)=> {
                                    return <span key={index}>{(index ? ', ' : '') + element }</span>
                                })}
                            </h5>
                            <h5 className='restaurant-number'>Phone: {restaurant.display_phone}</h5>
                            <h5>Rating: {restaurant.rating}/5 ({restaurant.review_count} reviews)</h5>
                            <h5 className='restaurant-category'>
                                Categories: {restaurant.categories.map((element, index)=> {
                                 return <span key={index}>{(index ? ', ' : '') + element.title }</span> 
                                })}
                            </h5>
                        </section>                    
                    </section>
                </section>
                <section className='restaurant-info-box-2'>
                    <section className='restaurant-info-container2'>
                        <img src={photos[1]}/>
                        <img src={photos[2]}/>
                    </section>
                </section>
            </section>
            <footer>
                <Button variant='contained' onClick={() => props.history.push('/dash')}>Back</Button>
                <Button variant='contained' onClick={() => handleAddRestaurant()}>Add to list</Button>
                {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        This is a success message!
                    </Alert>
                </Snackbar>
                <Alert severity="success">This is a success message!</Alert> */}
            </footer>
        </div>
    )
}

const mapStateToProps = reduxState => {
    return {
        user_id: reduxState.user.user_id
    }
}

export default connect(mapStateToProps)(Restaurant)
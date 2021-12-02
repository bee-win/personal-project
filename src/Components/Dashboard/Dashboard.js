import axios from 'axios'
import React, {userState, useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import{getRestaurants} from '../../redux/reducer'
//Component Imports
import Header from '../Header/Header'
import Restaurant from '../Restaurant/Restaurant'
//Styling Imports
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import 'fontsource-roboto';
import './Dashboard.scss'

const Dashboard = (props) => {
    const {restaurantList, getRestaurants} = props
    const [userInput, setUserInput] = useState('')
    const [location, setLocation] = useState('')
    // const [restaurantList, setRestaurantList] = useState([])
    const [sortBy, setSortBy] = useState('best-match')

    useEffect(() => {
        axios.post('/api/restaurant', {location, sortBy})
            .then(res=> {
                getRestaurants(res.data)
            })
            .catch(err => console.log(err))
    }, [location, sortBy])
    // console.log('restaurantList: ', restaurantList)
    return (
        <section className='dashboard'>
            <Header />

            <section className='dashboard-container'>
                <div className='restaurant-list-container'>
                    {restaurantList.map((element, index) => {
                        return <div>
                            <Link to={{ pathname:`/restaurant/${element.name}`, state: {element} }}>
                                <h2 key={index}>{element.name}</h2>
                            </Link>
                        </div>
                    })}
                </div>
                <div className='sort-container'>
                    <TextField className='location-input' label='Enter Location'  onChange={e => setUserInput(e.target.value)} />
                    {/* <input className='location-input' placeholder='Enter Location' onChange={e => setUserInput(e.target.value)}/> */}
                    <h2>Sort by:</h2>
                    <label>
                        <input type="radio"  name='sort-by' onClick={() => setSortBy('best_match')}/>
                        <span>Best Match</span>
                    </label>
                    <label>
                        <input type="radio" name='sort-by' onClick={() => setSortBy('rating')} />
                        <span >Rating</span>                    
                    </label>
                    <label>
                        <input type="radio" name='sort-by' onClick={() => setSortBy('review_count')}/>
                        <span >Review Count</span>
                    </label>
                    <label>
                        <input type="radio" name='sort-by' onClick={() => setSortBy('distance')}/>
                        <span >Distance</span>
                    </label> 
                    <Button className='search-button' variant='contained' onClick={ () => setLocation(userInput)}>Search</Button>
                </div>
            </section>
        </section>

    )
}



const mapStateToProps = (stateRedux) => stateRedux
export default connect(mapStateToProps, {getRestaurants})(Dashboard)

//combineReducer
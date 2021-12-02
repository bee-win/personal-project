import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Dashboard from './Components/Dashboard/Dashboard'
import Landing from './Components/Landing/Landing'
import Profile from './Components/Profile/Profile'
import Restaurant from './Components/Restaurant/Restaurant'
import RestaurantList from './Components/RestaurantList/RestaurantList'

export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/dash' component={Dashboard} />
        <Route path='/profile' component={Profile} />
        <Route path='/restaurant/:restaurantName' component={Restaurant}/>
        <Route path='/restaurant-list' component={RestaurantList}/>
    </Switch>
)
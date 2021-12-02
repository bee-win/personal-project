const initialState = {
    location: '',
    restaurantList: []
}

const GET_RESTAURANTS = 'GET_RESTAURANTS'
const GET_LOCATION = 'GET_LOCATION'

export function getRestaurants(restaurantArr){
    return{
        type: GET_RESTAURANTS,
        payload: restaurantArr
    }
}

export function getLocation(location){
    return{
        type: GET_LOCATION,
        payload: location
    }
}

export default function reducer(state = initialState, action){
    const { type, payload } = action

    switch(type){
        case GET_RESTAURANTS:
            return {...state, restaurantList: payload}
        case GET_LOCATION:
            return {...state, location: payload}
        default:
            return state
    }
}
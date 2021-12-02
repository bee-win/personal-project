require('dotenv').config()
const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      axios = require('axios'),
      authCtrl = require('./controllers/authController'),
      mainCtrl = require('./controllers/mainController')
const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET, BEARER_TOKEN} = process.env
const port = SERVER_PORT || 7777
const app = express()

app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 365 }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(db => {
    app.set('db', db)
    console.log('db connected')
    app.listen(port, () => console.log(`Listening on port ${port}`))
})

//Auth Endpoints
app.post('/api/register', authCtrl.register)
app.post('/api/login', authCtrl.login)
app.get('/api/logout', authCtrl.logout)

//Main Endpoints
app.post('/api/addRestaurant', mainCtrl.addRestaurant)
app.get('/api/saved-restaurants/:id', mainCtrl.getUserList)
app.delete('/api/saved-restaurants/:user_id&:restaurantId', mainCtrl.deleteRestaurant)

//User Endpoints
app.put('/api/user/:id', mainCtrl.updateUsername)

//API Endpoints
app.post('/api/restaurant', mainCtrl.getRestaurant)
app.get('/api/restaurant/:id', mainCtrl.getRestaurantById)

//NodeMailer Endpoints
app.post('/api/email', mainCtrl.email)



const axios = require('axios')
const nodemailer = require('nodemailer')
const {BEARER_TOKEN, EMAIL, PASSWORD} = process.env

module.exports = {
    getRestaurant: (req, res) => {
        const {location, sortBy} = req.body
        const baseUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants`
        var config = {
            "headers": { 
                Authorization: `Bearer ${BEARER_TOKEN}`
            }
        };

        axios.get(`${baseUrl}&sort_by=${sortBy}&location=${location}`, config)
            .then( restaurants => {
                res.status(200).send(restaurants.data.businesses)})
            // .catch(err => console.log(err))
    },
    getRestaurantById: (req, res) => {
        const {id} = req.params
        const baseUrl = `https://api.yelp.com/v3/businesses/`
        var config = {
            "headers": { 
                Authorization: `Bearer ${BEARER_TOKEN}`
            }
        };
        console.log(`maincontroller getRestaurantById URL: ${baseUrl}${id}`)
        axios.get(`${baseUrl}${id}`, config)
            .then(restaurant => {
                res.status(200).send(restaurant.data)
            })
            // .catch(err => console.log(err))
    },
    addRestaurant: (req, res) => {
        const  {userId, restaurantId, restaurantUrl, restaurantName, restaurantImg, phone,
                rating, reviewCount, address1, city, zipCode, country, state, price} = req.body
        const db = req.app.get('db')

        db.restaurants.add_restaurant(userId, restaurantId, restaurantUrl, restaurantName, restaurantImg, phone,
            rating, reviewCount, address1, city, zipCode, country, state, price)
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
    },
    deleteRestaurant: (req, res) => {
        const {user_id, restaurantId} = req.params
        const db = req.app.get('db')

        console.log(` ${user_id}... restaurantId: ${restaurantId}`)
        db.restaurants.delete_restaurant(user_id, restaurantId)
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err))
        
    },
    getUserList: (req, res) => {
        const {id} = req.params
        const db = req.app.get('db')
        console.log(id)
        db.restaurants.get_user_list(id)
            .then(restaurants => res.status(200).send(restaurants))
            .catch(err => res.status(500).send(err))
    },
    updateUsername: (req, res) => {
        const {id} = req.params
        const {username} = req.body
        const db = req.app.get('db')

        db.users.update_user(username, id)
            .then(user => res.status(200).send(user))
            .catch(err => res.status(500).send(err))
    },
    email: async(req, res) => {
        // try/catch is used to handle errors without the use of .then and .catch
        try {
            //The transporter is essentially the email that you are using to send
            //emails to your users. This is done using NodeMailers createTransport
            //method, passing it an object containing the information needed to 
            //sign into the email.
            let transporter = nodemailer.createTransport({
                host: 'smtp.mail.yahoo.com',
                //host: 'smtp.gmail.com'
                port: 465,
                //gmailPORT --> port: 587
                service: 'yahoo',
                //service: 'gmail'
                secure: false,
                //gmailONLY --> requireTLS: true
                //You should include your email and password for this email account
                //to your .env file to keep that information secure
                auth: {
                    user: EMAIL,
                    pass: PASSWORD
                }
            });

            //info gets defined the result of the sendMail method. This method is 
            //attached to your transporter upon its creation. sendMail needs to be
            //passed an object that contains information about the email itself, 
            //meaning the from and to categories, the subject, and the body of the
            //email.
            let info = await transporter.sendMail({
                from: `Restaurant Finder <${EMAIL}>`,
                to: 'tedhungkk@gmail.com',
                subject: 'NodeMailer Test',
                //text is for plain text support if the html cannot load properly
                text: 'This is a NodeMailer Test',
                //html contains the body of your email, and can use html tags to
                //structure it, and inline styling to style it. IF you are using an
                //image, you should pass the src that is provided below, and then
                //give the actual image a value in the attachments array below.
                html: `<div>This is NodeMailer Test</div>
                        <img src="cid:unique@nodemailer.com"/>`,
                //attachments include files attached to the email, as well as sources
                //for your images.
                attachments: [
                    {
                        filename: 'license.txt',
                        path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
                    },
                    {
                        cid: 'unique@nodemailer.com',
                        path: 'https://i.kym-cdn.com/photos/images/original/001/516/899/f31.jpg'
                    }
                ]
            }, (err, res) => {
                if(err){
                    console.log(err)
                } else {
                    res.status(200).send(info);
                }
            })
        } catch(err){
            res.status(500).send(err);
        }
    }
}
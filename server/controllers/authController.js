const bcrypt = require('bcryptjs')

module.exports = {
    register: async(req, res) => {
        try {
            const {username, email, password, profilePicture} = req.body
            const db = req.app.get('db')

            //Checks if email is already registered, returns if registered
            const [foundUser] = await db.users.check_user({email})
            if(foundUser){
                return res.status(400).send('Email is already in use.')
            }

            let salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            const [newUser] = await db.users.register_user({username, email, hash, profilePicture})

            req.session.user = newUser
            res.status(201).send(req.session.user)
        } catch (error) {
            console.log('error')
        }
    },
    login: async(req, res) => {
        try {
            const {email, password} = req.body
            const db = req.app.get('db')

            const [foundUser] = await db.users.check_user({email})
            if(!foundUser){
                return res.status(400).send('Email not found.')
            }

            const authenticated = bcrypt.compareSync(password, foundUser.hash)
            if(!authenticated){
                return res.status(401).send('Password is incorrect.')
            }

            delete foundUser.password
            req.session.user = foundUser
            res.status(202).send(req.session.user)
        } catch (error) {
            console.log('error')
        }
    },
    logout: (req, res) => {
        try {
            req.session.destroy()
            res.sendStatus(200)
        } catch (error) {
            console.log('error')
        }
    }
}
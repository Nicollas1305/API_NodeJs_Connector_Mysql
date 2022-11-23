const connection = require('../database/connection')

const responseModel = {
    success: false,
    data: [],
    username: username
}

module.exports = {

    async create(req, res) {
        const response = {...responseModel}

        const { username, password } = req.body;

        const [, affectedRows] = await connection.query(`
            INSERT INTO users VALUES (
                DEFAULT,
                '${username}',
                '${password}',
                NOW(),
                NOW()
            );
        `)

        if(affectedRows > 0) {
            response.success = true
            response.username = username
        }

        return res.json(response)
    },

    async login(req, res) {
        const response = {...responseModel}

        const { username, password, id } = req.body;

        const [, data] = await connection.query(`
            SELECT * FROM users
            WHERE username='${username}' AND password='${password}'
            ORDER BY id DESC LIMIT 1
        `)

        if(data.length > 0) {
            response.status = "ok",
            response.message =  "Logged in",
            response.accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imthcm4ueW9uZ0BtZWNhbGxhcGkuY29tIiwiaWF0IjoxNjY5MTc0NDQ3LCJleHAiOjE2NjkxNzQ1MDd9.7wTPV6VPymU1F9Qtf6WCOyoPwyvB-MySF9OndP8zDQg",
            response.expiresIn =  60000,
            response.user =  {
                "id": id,
                "fname": "fname",
                "lname": "lname",
                "username": username,
                "password": password,
                "email": username,
                "avatar": "https://www.melivecode.com/users/1.png"
            }
        }
        
        return res.json(response)
    }

}
const jwt = require('jsonwebtoken');
module.exports = {
    //generate refresh token
      //generate refresh token 
      generateAccessToken: (userId, duration = "1h") => {
          console.log(process.env.APP_NAME)
        return new Promise((resolve, reject) => {
            const payload = {
                _id: userId,
                iss: process.env.APP_NAME
            }
            const options = {
                expiresIn: duration
            }
            jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options, (err, token) => {
                if (err) reject(err)
                resolve(token)
            })
        })
    },
}
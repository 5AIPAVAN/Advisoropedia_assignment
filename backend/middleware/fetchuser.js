const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "$@IPAVAN";

const fetchuser = (req,res,next) => {

    // given-auth-token is given by us in headers of Get User data request in thunder-client
    //headers -> just replaces header variable with data given by us (like environment variables)
    const token = req.header('given-auth-token');

    console.log('IN FETCHUSER MIDDLEWARE :' + token);
    // got token from headers or not
    if (!token) {
        res.status(401).send({ error: "SEEMS LIKE IN-VALID TOKEN -token not received - (check given-auth-token)" });
    }


    try {
        // VERIFY obtained token using our secret key -> JWT_SECRET_KEY
        // EXTRACT DATA if verification is done successfully
        const data = jwt.verify(token, JWT_SECRET_KEY);

        console.log(data)
        // STORE obtained data in req.user
        req.user = data.found_user;
        if(!req.user){ // when new signin(just created account) entered into "/" after just creating account
            req.user = data.user;
        }

        console.log("IN MIDDLEWARE DATA OBTAINED + ")
        console.log( req.user);

        // move to next function (see at where fetchuser middleware is used)
        next();

    } catch (error) {
        console.log("SOME ERROR OCCURED (try-catch) :" + error);
        res.status(401).send("SEEMS LIKE IN-VALID TOKEN (check given-auth-token) (try-catch)");
    }

}

module.exports = fetchuser;
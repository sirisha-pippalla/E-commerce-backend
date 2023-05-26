const admin = require("../firebase/index");

exports.authCheck = async (req, res, next) => {
    // console.log("request from headers in middlewares", req.headers) //here we get auth token from frontend to backend, here we pass request from headers and validate that given, and gets the user information here.

    //varification for valid token
    try{
        const firebaseUser = await admin
        .auth()
        .verifyIdToken(req.headers.authtoken);
       // console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);
        req.user = firebaseUser;
        next();

    }catch(err){
        res.status(401).json({
            err: "Invalid or expaired token",
        })
    }
    
}



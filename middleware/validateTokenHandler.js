// const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");

// const validateToken = asyncHandler(async(req, res, next) => {
//     let token;
//     let authHeader = req.headers.Authorization || req.headers.authorization;
//     if (authHeader && authHeader.startsWith("Bearer")){
//         token = authHeader.substr.split(" ")[1];
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
//             if (err){
//                 res.status(401);
//                 throw new Error("User is not authorized");
//             }
//             console.log(decoded);
//         });
//     }
// });

// module.exports = validateToken; 

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];  // Fix the typo here
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            }
            console.log(decoded);
            // Optionally, you might want to attach the decoded user information to the request
            req.user = decoded;
            next();
        });
    } else {
        res.status(401);
        throw new Error("Authorization header missing or invalid");
    }
});

module.exports = validateToken;

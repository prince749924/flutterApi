const{createError} = require("../utlis/error")
const jwt = require("jsonwebtoken")
const verifyToken = (req, res, next) => {
    const token = req.headers.AuthToken;
    if (!token) {
        return next(createError(403, "You are not authenticated"));
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid"));
        req.user = user;
        next();
    });
};
const verifyUser = (req, res, next) => {

    verifyToken(req, res, next, () => {

        if (req.params.id === req.user.id || req.user.isAdmin) {

            next();

        } else {

            return next(createError(401, "You are not authenticated"));

        }

    });

};

 

const verifyAdmin = (req, res, next) => {

    verifyToken(req, res, next, () => {

        if (req.user.isAdmin) {

            next();

        } else {

            return next(createError(401, "You are not authenticated"));

        }

    });

};

 

module.exports = { verifyAdmin, verifyToken, verifyUser }
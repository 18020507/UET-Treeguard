const jwt = require('jsonwebtoken');

const veryfyToken = async (req, res, next) => {
    const JWT_SECRET = process.env.JWT_SECRET || "randomsecretstring";
    const token = req.headers.token;
    // res.json(token);
    if(token) {
        try {
            const credentials = jwt.verify(token, JWT_SECRET);
            res.locals = credentials;
            next();
        } catch {
            res.json({
                code: 401,
                message: "Token is invalid.",
                data: {signedIn: false}
            })
        }
    } else {
        res.json({
            code: 401,
            message: "Login required.",
            data: {signedIn: false}
        });
    }
    
    
};

module.exports = veryfyToken;
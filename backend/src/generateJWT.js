const jwt = require('jsonwebtoken');

const generateJWT = (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET || "randomsecretstring";;
    if (!JWT_SECRET) {
        res.send({code:500, error: 'Missing JWT_SECRET. Refusing to authenticate.'});
        return;
    }
    try {
        const user = res.locals;
        const credentials = {
            ...user,
            signedIn: true,
        };
        console.log(res.locals);
        const token = jwt.sign(credentials, JWT_SECRET);
        res.send({ code: 200, data:{token} });
    } catch (error) {
        console.log(error);
        res.send({ code: 403, message: 'Invalid credentials.' });
    }
};

module.exports = generateJWT;
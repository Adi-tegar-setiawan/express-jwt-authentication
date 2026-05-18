const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    try {
        const autheader = req.headers.authorization;

        if(!autheader) return res.status(401).json({message: 'token required'});

        const token = autheader.split(' ')[1];
        const decode = jwt.verify(
            token, process.env.ACCESS_TOKEN_SECRET
        );
        req.user = decode;
        next()
    } catch (error) {
        res.status(401).json({message: 'invalid token'})
    }
}

module.exports = verifyToken
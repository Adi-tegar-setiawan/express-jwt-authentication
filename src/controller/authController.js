const bcrypt = require('bcrypt');
const dbPool = require('../config/database');
const {
    generateAccessToken,
    generateRefreshToken
} =  require('../utils/generateTokens')

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hasedPassword = await bcrypt.hash(password, 10);

        const sqlQuery = `INSERT INTO users (name, email, password) VALUES (?, ? ,?)`;
        await dbPool.execute(sqlQuery, [name, email, hasedPassword]);

        res.status(201).json({
            message: 'register success'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const sqlQuery = `SELECT * FROM users WHERE email = ?`;
        
        const [data] = await dbPool.execute(sqlQuery, [email]);

        if(data.length === 0) return res.status(404).json({message: 'user not found'});

        const user = data[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(401).json({message: 'wrong email or password'});

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await dbPool.execute(
            `UPDATE users SET refresh_token = ? where id = ?`,
            [refreshToken, user.id]
        );

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.json({
            message: 'login success',
            accessToken
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if(!token) return res.status(401).json({message: 'refresh token not found'});
        
        const [data] = await dbPool.execute(
            `SELECT * FROM users WHERE refresh_token = ?`,
            [token]
        )

        if(data.length === 0) return res.status(403).json({message: 'invalid refresh token'});

        jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decode) => {
                if(err) return res.status(403).json({message: 'invalid token'});

                const accessToken = jwt.sign({
                    id: decode.id
                }, process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '15m'
                });
                res.json({accessToken})
            }
        )
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if(!token) return res.status(204);

        await dbPool.execute(
            `UPDATE users SET refresh_token = NULL WHERE refresh_token = ?`,
            [token]
        );

        res.clearCookie('refreshToken');
        res.json({
            message: 'logout success'
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    register,
    login,
    refreshToken,
    logout
}
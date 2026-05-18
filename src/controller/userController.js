const dbPool = require('../config/database');

const getProfile = async (req, res) => {
    try {
        const [data] = await dbPool.execute(
            `SELECT id, name, email, created_at FROM users WHERE id = ?`,
            [req.user.id]
        );

        res.json(data[0])
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name } = req.body;
        await dbPool.execute(
            `UPDATE users SET name = ? WHERE id = ?`,
            [name, req.user.id]
        );
        res.json({
            message: 'profile updated'
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getProfile,
    updateProfile
}
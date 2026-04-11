const db = require('../config/db');

class UserRepository {
    async createUser(email, passwordHash, firstName, lastName) {
        const query = `
            INSERT INTO users (email, password_hash, first_name, last_name) 
            VALUES ($1, $2, $3, $4) 
            RETURNING user_id, email;
        `;
        const values = [email, passwordHash, firstName, lastName];
        const { rows } = await db.query(query, values);
        return rows[0];
    }

    async findUserByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1';
        const { rows } = await db.query(query, [email]);
        return rows[0];
    }

    async findUserById(userId) {
        const query = 'SELECT user_id, email, first_name, last_name, is_verified, role_id FROM users WHERE user_id = $1';
        const { rows } = await db.query(query, [userId]);
        return rows[0];
    }

    async updatePassword(userId, newPasswordHash) {
        const query = 'UPDATE users SET password_hash = $1, updated_at = NOW() WHERE user_id = $2';
        await db.query(query, [newPasswordHash, userId]);
    }

    async markEmailVerified(userId) {
        const query = 'UPDATE users SET is_verified = true WHERE user_id = $1';
        await db.query(query, [userId]);
    }
}

module.exports = new UserRepository();
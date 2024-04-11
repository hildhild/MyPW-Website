const { poolPromise, sql } = require('../../config/db');
// const sql = require('mssql/msnodesqlv8');

class FeedbackModel {
    async getAllData() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM FEEDBACK');
            const formattedResult = result.recordset.map((row) => {
                return {
                    ...row,
                    time: row.time ? formatDate(row.time) : null
                };
            }); 
            function formatDate(date) {
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                return `${day}/${month}/${year}`;
            }
            return formattedResult;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    async calculateAverageFeedbackStar() {
        try {
            const pool = await poolPromise;
            const result = await pool
                .request()
                .query('SELECT AVG(CAST(star AS FLOAT)) AS averageStar, COUNT(*) AS feedbackCount FROM FEEDBACK');
            const { averageStar, feedbackCount } = result.recordset[0];
            return { averageStar, feedbackCount };
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }

    async findFeedbackOfUser(username) {
        try {
            const queryString = 'SELECT * FROM FEEDBACK WHERE username = @username';
            
            const pool = await poolPromise;
            const result = await pool.request()
                .input('username', sql.NVarChar, username)
                .query(queryString);
            
            if (result.recordset.length > 0) {
                return result.recordset;
            } else {
                return null;
            }
        } catch (err) {
            return null;
        }
    }

    async addFeedback(username, des, star) {
        try {
            const queryString = 'INSERT INTO FEEDBACK (username, Description, star, reply, time) VALUES (@username, @des, @star, NULL, GETDATE());';
            
            const pool = await poolPromise;
            const result = await pool.request()
                .input('username', sql.NVarChar, username)
                .input('des', sql.NVarChar, des) 
                .input('star', sql.Int, star)
                .query(queryString);
        } catch (err) {
            return null;
        }
    }

    async deleteFeedback(username) {
        try {
            const queryString = 'DELETE FROM FEEDBACK WHERE username = @username;';
            const pool = await poolPromise;

            const result = await pool.request()
                .input('username', sql.NVarChar, username)
                .query(queryString);
        } catch (err) {
            return null;
        }
    }

    async patchFeedback(username, des, star) {
        try {
            const queryString = 'UPDATE FEEDBACK SET Description = @des, star = @star WHERE username = @username;';
            
            const pool = await poolPromise;
            const result = await pool.request()
                .input('username', sql.NVarChar, username)
                .input('des', sql.NVarChar, des) 
                .input('star', sql.Int, star)
                .query(queryString);

        } catch (err) {
            return null;
        }
    }
}


module.exports = new FeedbackModel;
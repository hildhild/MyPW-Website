const { poolPromise, sql } = require('../../config/db');
// const sql = require('mssql/msnodesqlv8');

class AccountModel {
    async findUsername(username) {
        try {
            const queryString = 'SELECT TOP 1 * FROM ACCOUNT WHERE username = @username';
            
            const pool = await poolPromise;
            const result = await pool.request()
                .input('username', sql.NVarChar, username)
                .query(queryString);
            if (result.recordset.length > 0) {
                // Return the recordset if there are results
                return result.recordset;
            } else {
                // Return null if no results are found
                return null;
            }
        } catch (err) {
            // console.error('Error executing query:', err);
            return null;
        }
    }
    async getUsername() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT username FROM ACCOUNT');
    
            if (result.recordset.length > 0) {
                // Return the recordset if there are results
                return result.recordset;
            } else {
                // Return null if no results are found
                return null;
            }
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
    async getAllData() {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT * FROM ACCOUNT');
    
            return result.recordset;
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
    
}


module.exports = new AccountModel;
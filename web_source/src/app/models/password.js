const { poolPromise, sql } = require('../../config/db');

class PasswordModel {
    async getPasswordsFrom(username) {
        try {
            const pool = await poolPromise;
            const queryString = 'SELECT * FROM PASSWORDITEM WHERE username = @username';
            const result = await pool.request()
                .input('username', sql.NVarChar, username)
                .query(queryString);
            if (result.recordset.length > 0) {
                return result.recordset;
            } else {
                return null;
            }
        } catch (err) {
            console.error('Error executing query:', err);
            throw err;
        }
    }
	async comparedUsedPassword(username, password) {
		try {
			const pool = await poolPromise;
			const queryString ='SELECT COUNT(*) AS count FROM PASSWORDITEM WHERE username = @username AND password = @password';
			const result = await pool.request()
				.input('username', sql.NVarChar(127), username)
				.input('password', sql.NVarChar(127), password)
				.query(queryString);
			if (result.recordset.length > 0) {
				return result.recordset[0]['count'];
			} else { 
				return null;
			}

		} catch (err) {
			console.error('Error executing query:', err);
			throw err;
		}
	}
	async addNewPassword(username, website, password) {
		try {
			const dayCreate = new Date();
			var dayExpire = new Date(dayCreate);
			dayExpire.setFullYear(dayCreate.getFullYear() + 5);
			const lastAccessDay = new Date(dayCreate);
			const pool = await poolPromise;
			const queryString = 'INSERT INTO PASSWORDITEM(username, dayCreate, dayExpire, active, password, url, lastAccessDay) VALUES (@username, @dayCreate, @dayExpire, @active, @password, @url, @lastAccessDay);';
			const result = await pool.request()
					.input('username', sql.NVarChar(127), username)
					.input('dayCreate', sql.DateTime2, dayCreate.toISOString())
					.input('dayExpire', sql.DateTime2, dayExpire.toISOString())
					.input('active', sql.Bit, 1)
					.input('password', sql.NVarChar(127), password)
					.input('url', sql.NVarChar(127), website)
					.input('lastAccessDay', sql.DateTime2, lastAccessDay.toISOString())
					.query(queryString);
	    } catch (err) {
			console.error('Error executing query:', err);
			throw err;
		}
	}

	async deletePassword(username, website) {
		try {
            const pool = await poolPromise;
			const queryString = 'DELETE FROM PASSWORDITEM WHERE username = @username AND url = @url';
			const result = await pool.request()
				.input('username', sql.NVarChar(127), username)
				.input('url', sql.NVarChar(127), website)
				.query(queryString);
		} catch (err) {
			console.error('Error executing query:', err);
			throw err;
		}
	}

	async patchPassword(username, url, password) {
		try {
            const pool = await poolPromise;
			const lastAccessDay = new Date();
			const queryString = 'UPDATE PASSWORDITEM SET password = @password, lastAccessDay = @lastAccessDay WHERE username = @username AND url = @url';
			const result = await pool.request()
				.input('username', sql.NVarChar(127), username)
				.input('url', sql.NVarChar(127), url)
				.input('password', sql.NVarChar(127), password)
				.input('lastAccessDay', sql.DateTime2, lastAccessDay.toISOString())
				.query(queryString);
		} catch (err) {
			console.error('Error executing query:', err);
			throw err;
		}
	}

	async findUrl(username, url) {
		try {
            const pool = await poolPromise;
			const queryString = 'SELECT TOP 1 * FROM PASSWORDITEM WHERE username = @username AND url = @url';
			const result = await pool.request()
				.input('username', sql.NVarChar(127), username)
				.input('url', sql.NVarChar(127), url)
				.query(queryString);
			if (result.recordset.length > 0) {
				return result.recordset[0];
			} else { 
				return null;
			}
		} catch (err) {
			console.error('Error executing query:', err);
			throw err;
		}
	}
}

module.exports = new PasswordModel;
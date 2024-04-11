const {poolPromise, sql} = require('../../config/db');

class PublicPasswordModel{
	async checkPublicPassword(password){
		try {
			const pool = await poolPromise;
			const queryString = 'SELECT dbo.checkCommonPassword(@password)';
			const result = await pool.request()
				.input('password', sql.NVarChar(127), password)
				.query(queryString);
			if (result.recordset.length > 0) {
				return result.recordset[0][''];
			} else {
				return true;
			}
		} catch(err){
			console.error('Error executing query:', err);
			throw err;
		}
	}
}

module.exports = new PublicPasswordModel;
// const PublicPassword = new PublicPasswordModel();

// const test = await PublicPassword.checkPublicPassword('Admin');
// console.log(test);
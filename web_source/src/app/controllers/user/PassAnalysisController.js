const analyze = require('../../api/analyzer');
class PassAnalysisController {
  	// [GET] / 
	index(req, res, next){
		// Default
		const content = [
		{
			title: "Requirement",
			content: "Basic password requirement",
			// tail1: true,
		},
		{
			title: "Password Entrophy",
			content: "Password entrophy calculated against brute force attack",
			// tail2: true,
		},
		{
			title: "Match used password",
			content: "Commpare this password with other used password",
			// tail3: true,
		},
		{
			title: "Weak known public password",
			content: "Weak and vulnerable to online search attack",
			// tail4: true,
		}];
		res.render('user/passana', {
		passanalActive : true,
		criteria: content
		})
	}
  	// [POST] /
	async analyze(req, res, next){
		const password = req.body.password;
		const username = req.session.user.username;
		const criteria = await analyze(username,password)
			.then(content => {
				content.forEach(element => {
					if (element.evaluation === 5) {
						element.tail4 = true;
					} else if (element.evaluation === 4) {
						element.tail3 = true;
					} else if (element.evaluation === 2 || element.evaluation === 3) {
						element.tail2 = true;
					} else {
						element.tail1 = true;
					}
				})
				return content;
			})
		res.render('user/passana', {
			passanalActive : true,
			criteria: criteria,
			password: password
		})
	}
}

module.exports = new PassAnalysisController;
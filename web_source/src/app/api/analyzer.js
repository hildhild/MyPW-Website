const PublicPassword = require('../models/public');
const PasswordItem = require('../models/password');
function checkrequirements(password) {
	var evaluation = 5;
	const msg = []
	if (password.length < 8) {
		evaluation--;
		msg.push('Password should have at least 8 characters');
	} else if (password.length > 32) {
		evaluation--;
		msg.push('Password should have at most 32 characters');
	}

	if (!/[0-9]/.test(password)) {
		evaluation--;
		msg.push('Password should contain at least one digit');
	}

	if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
		evaluation--;
		msg.push('Password should contain at least one special character');
	}

	if (!/[a-z]/.test(password)) {
		evaluation--;
		msg.push('Password should contain at least one lowercase letter');
	}
	if (!/[A-Z]/.test(password)) {
		evaluation--;
		msg.push('Password should contain at least one uppercase letter');
	}
	

	return {
		title: "Requirement",
		content: 'Basic password requirement',
		msg: evaluation === 5 ? ['Password meets all the requirement'] : msg,
		evaluation: evaluation
	};
}



function calculatePasswordEntropy(password) {
    // Define the character domain sets
	function calculatePatternEntropy(password, EntropyPerChar) {
		const repeatPatternPenalty = 0.75; // Adjust as needed
		const entropyChar = [];
		var currentEntropy = 1;
		let PatternEntropy = 0; 
		for (let i = 0; i < password.length - 1; i++) {
			if (password[i] === password[i + 1]) {
				currentEntropy *= repeatPatternPenalty;
				entropyChar.push(currentEntropy);
			} else {
				currentEntropy = 1;
				entropyChar.push(currentEntropy);
			}
		}
		entropyChar.push(1);
		entropyChar.forEach(element => {
			PatternEntropy += element * EntropyPerChar;		
		});
		return PatternEntropy;
	}
	function evaluate(passwordEntropy, patternEntropy) {
		const relaxedAvg = 2 * (passwordEntropy * patternEntropy) / (passwordEntropy + patternEntropy);
		if (relaxedAvg > 80.00) {
			return 5;
		} else if (relaxedAvg > 60.00) {
			return 4;
		} else if (relaxedAvg > 30.00) {
			return 2;
		}
		return 1;
	}
    const lowercaseLetters = /[a-z]/.test(password) ?  'abcdefghijklmnopqrstuvwxyz': '';
    const uppercaseLetters = /[A_Z]/.test(password) ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '';
    const digits = /[0-9]/.test(password) ? '0123456789' : '';
	const specialCharacters = /[~!@#$%^&*()\[\]{}|;:,.<>?\\]/.test(password) ? 
		'~!@#$%^&*()-=_+[]{}|;:,.<>?' : '';
    const characterSet = lowercaseLetters + uppercaseLetters + digits + specialCharacters;
    const entropyPerChar = Math.log2(characterSet.length);
	const passwordEntropy = password.length * entropyPerChar;
	const patternEntropy = calculatePatternEntropy(password, entropyPerChar);
	const evaluation = evaluate(passwordEntropy, patternEntropy);
	let msg = [`Password Entropy: ${passwordEntropy.toFixed(2)} bits`, `Pattern Entropy: ${patternEntropy.toFixed(2)} bits`];
	return { 
		title : "Password Entrophy",
		content: 'Password entrophy calculated against brute force attack',
		msg : msg,
		evaluation: evaluation
	};
}

async function matchUsed(username, password) {
	const result = await PasswordItem.comparedUsedPassword(username, password);
	if (result === 0){
		return {
			title: "Match used password",
			content: "Commpare this password with other used password",
			msg : ['Password has not been used'],
			evaluation: 5,
		};
	}
	return {
		title: "Match used password",
		content: "Commpare this password with other used password",
		msg : ['Password used for ' + result + ' other passwords in this account'],
		evaluation: (result < 5) ? 3 : 1,
	};
}

async function weakPublic(password) {
	const result = await PublicPassword.checkPublicPassword(password);
	if (result) {
		return {
			title: "Weak known public password",
			content: "Weak and vulnerable to online search attack",
			evaluation: 1,
			msg : ['Password appeared in an public password list']
		};
	}
	return {
		title: "Weak known public password",
		content: "Weak and vulnerable to online search attack",
		evaluation: 5,
		msg : ['Password did not appear in any public password list']
	};
}

async function analyze(username, password) {
	const criteria =  [
		checkrequirements(password), 
		calculatePasswordEntropy(password)
	];
	criteria.push(await matchUsed(username, password));
	criteria.push(await weakPublic(password));


	return criteria;
}

module.exports = analyze;

// const test = analyze('2adoas1p2edcm@!@@');
// console.log(test);
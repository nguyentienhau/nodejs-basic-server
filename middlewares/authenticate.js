const { AccountStatus } = require("../constants");
const { Account } = require("../models");

module.exports = async function (request, response) {
	try {
		const sessionToken = request.headers["authorization"].replace("Bearer ", "");
		const session = response.locals.session;
		const email = sessionToken.dest.email;

		if (session.email === email) {
			const account = await Account.findOne({ where: { email, status: AccountStatus.active } });

			if (account && account.id) {
				return { success: true };
			} else {
				return { success: false, message: "User not found" };
			}
		} else {
			return { success: false, message: "Authenticate failed" };
		}
	} catch (error) {
		return { success: false, error, message: "Authenticate failed" };
	}
};

/** @format */
Account = require('./account_model.js');
module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('user', {
		id: {
			type:Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		user_name: {
			type: Sequelize.STRING,
		},
		lifetime_export: {
			type: Sequelize.DATE,
		},
		lastdaily_export: {
			type: Sequelize.DATE,
		},
		validity: {
			type: Sequelize.STRING,
		},
		g_account: {
			type: Sequelize.INTEGER,
		},
		fb_account: {
			type: Sequelize.INTEGER,
		},
		sector: {
			type: Sequelize.STRING,
		},
		subsector: {
			type: Sequelize.STRING,
		},
		clientnotes: {
			type: Sequelize.STRING,
		}
	});

	// User.hasOne(Account, {
	// 	foreignKey: "client_id",
	// 	targetKey: "id",
	// })

	return User;
};

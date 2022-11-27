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
		provider: {
			type: Sequelize.STRING,
		},
		refresh_token: {
			type: Sequelize.TEXT('long'),
		},
		g_account: {
			type: Sequelize.TEXT('long'),
		},
		fb_account: {
			type: Sequelize.TEXT('long'),
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

	User.associate = (models) => {
		User.hasOne(models.account, {
			foreignKey: "client_id",
			targetKey: "id",
		})
	}
	return User;
};

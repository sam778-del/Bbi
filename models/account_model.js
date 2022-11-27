/** @format */
User = require('./user_model.js')
module.exports = (sequelize, Sequelize) => {
	const Account = sequelize.define('account', {
		id: {
			type:Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		account_id: {
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
		client_id: {
			type: Sequelize.INTEGER,
			references: {
                model: 'user',
                key: 'id'
            }
		},
	});

	Account.associate = (models) => {
		Account.belongsTo(models.user, {
			foreignKey: "id",
		  });
	}
	return Account;
};

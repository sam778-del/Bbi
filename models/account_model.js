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
		}
	});

    // Account.belongsTo(User, {
    //     foreignKey: "client_id",
    //     targetKey: "id",
    //   });
	return Account;
};

require('dotenv').config({path: __dirname + '/.env'})
const models = require("../models");

const User = models.users;
const account = models.accounts;

const {
    GoogleAdsApi,
    MutateOperation,
    ResourceNames,
    enums,
} = require("google-ads-api");

/**
 * getJSON:  RESTful GET request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
 const client = new GoogleAdsApi({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    developer_token: "<DEVELOPER-TOKEN>",
});

const exportadsData = async (req, res) => {
    const customer = client.Customer({
        customer_id: "1234567890",
        refresh_token: "<REFRESH-TOKEN>",
    });
}

module.exports = {
    exportadsData
}
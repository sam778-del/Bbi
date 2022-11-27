const { Pool } = require("pg");
const cron = require("node-cron");
const fs = require("fs");
const os = require("os");
const prompt = require("prompt-sync");
const models = require("../models");

const User = models.users;
const account = models.accounts;

("use strict");
var request = require("request");

const http = require("http");
const https = require("https");
const { json, BIGINT } = require("sequelize");

/**
 * getJSON:  RESTful GET request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */


const authFacebook = async (req, res) => {
    try {
        function getAdInfo(aid, name) {
            var fields =
              "fb_row_id,date,acc_id,campaign_id,campaign_name,campaign_objective,placement,platform,impressions,reach,spend,clicks,cpc,ctr,cpm,post_engagment,30sec_view,thru_plays,avg_video_view,100%_video_play,25%_video_play,50%_video_play,75%_video_play,95%_video_play,frequency,play_actions,currency,actions,unqiue_clicks,unqiue_ctr";
            fields = "impressions,date_start,date_stop";
            var breakdowns = "platform_position,publisher_platform,device_platform";
            fields =
              "campaign_id,campaign_name,objective,impressions,reach,spend,clicks,cpc,ctr,cpm,inline_post_engagement,video_30_sec_watched_actions,cost_per_thruplay,canvas_avg_view_time,video_p100_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p95_watched_actions,frequency,video_play_actions,account_currency,actions,cost_per_unique_click,account_name,conversions,ad_id";
    
            var all_fields = fields + "," + breakdowns;
            var iurl = "graph.facebook.com";
            var insights =
              "/v15.0/" +
              aid +
              "/insights?fields=" +
              fields +
              "&breakdowns=" +
              breakdowns +
              "&&date_preset=maximum&access_token="+req.access_token+"";
    
            const options = {
              host: iurl,
              port: 443,
              path: insights,
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            };
    
            module.exports.getJSON(options, (statusCode, result) => {
              console.log("Name of Ad:", name, "data:", result.data);
              let csv = `${name}\n ${JSON.stringify(result.data)}\n\n`;
              fs.appendFile("public/assets/ads.csv", csv, function (err) {
                if (err) throw err;
                console.log("server details logged");
              });
            });
        }
        const access_token = req.access_token;
        const account_number = req.account_id; 
        console.log('Access Token '+access_token+' '+'Account number '+account_number)
        var url =
            "https://graph.facebook.com/v15.0/act_" +
            account_number +
            "/ads?access_token=" +
            access_token +
            "&fields=name";
        request.get(
            {
            url: url,
            json: true,
            headers: { "User-Agent": "request" },
            },
            (err, res, data) => {
                console.log(data);
            if (err) {
                console.log("Error:", err);
            } else if (res.statusCode !== 200) {
                console.log("Status:", res.statusCode);
            } else {
                // data is already parsed as JSON:
                // console.log("data.data", data.data);

                for (let i = 0; i < data.data.length; i++) {
                //console.log("The number is " + data.data[i].id);
                getAdInfo(data.data[i].id, data.data[i].name);
                }
            }
            }
        );
    } catch (err) {
        console.log(err);
    }
}

const getAllUser = async (req, res) => {
    try {

    }catch(err) {

    }
}

module.exports = {
    authFacebook,
}
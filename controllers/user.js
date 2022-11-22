const { Pool } = require("pg");
const cron = require("node-cron");
const fs = require("fs");
const os = require("os");
const prompt = require("prompt-sync");
const models = require("../models");

const User = models.users;

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

const getUser = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["id", "ASC"]],
    });
    if (users) {
      res.render("pages/main", { users: users });
    }
  } catch (err) {
    res.status(404).json({
      message: "Something went wrong.",
    });
  }
};

const createUser = async (req, res) => {
  return await User.create({
    user_name: req.body.client_name,
    lifetime_export: new Date(),
    lastdaily_export: new Date(),
    validity: "a",
    g_account: 1,
    fb_account: 2,
    sector: req.body.main_sector,
    subsector: req.body.sub_sector,
    clientnotes: req.body.client_notes,
  }).then(function (User) {
    if (User) {
      res.send(User);
      module.exports.getJSON = (options, onResult) => {
        console.log("rest::getJSON");
        const port = options.port == 443 ? https : http;

        let output = "";

        const req = port.request(options, (res) => {
          console.log(`${options.host} : ${res.statusCode}`);
          res.setEncoding("utf8");

          res.on("data", (chunk) => {
            output += chunk;
          });

          res.on("end", () => {
            let obj = JSON.parse(output);

            onResult(res.statusCode, obj);
          });
        });

        req.on("error", (err) => {
          console.log("error: " + err.message);
        });

        req.end();
      };
      /**
       Get the ads from the specific ad (using the id of that ad).
      */
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
          "&&date_preset=maximum&access_token=EAAR9zVP5oQgBAC1H9HvAfZCiENK090oM5RnSHvimBXAqB5mebKZAtCIS2RBthchu1raRf6cvkeDaN8I7JHYMQxiAj5GWSfZBgs2uOZC3gZAmC7cObds5RXvZChV2ALkqvl5GQ7vg3qg5ajQoh8qFmZA3ZCXQYVOcGqaeOFUXjuoiNRGGQZAAUS2LTdDs9cTBKXo0ZD";

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
          // I could work with the resulting HTML/JSON here. I could also just return it
          // console.log(`onResult: (${statusCode})\n\n${JSON.stringify(result)}`);

          // console.log(statusCode);

          console.log("Name of Ad:", name, "data:", result.data);
          //daily csv export
          cron.schedule("*/3600*24 * * * * *", function () {
            let heap = process.memoryUsage().heapUsed / 1024 / 1024;
            let date = new Date().toISOString();
            const freeMemory =
              Math.round((os.freemem() * 100) / os.totalmem()) + "%";
            let csv = `${name}\n ${JSON.stringify(result.data)}\n\n`;
            fs.appendFile("public/assets/ads.csv", csv, function (err) {
              if (err) throw err;
              console.log("server details logged");
            });
          });
          //
          //date
          /*
          date_start: '2019-11-05',
          date_stop: '2019-12-13'

          */
        });
      }

      /**
       Get the ads from the ad account id.
      */

      const access_token =
        "EAAR9zVP5oQgBAC1H9HvAfZCiENK090oM5RnSHvimBXAqB5mebKZAtCIS2RBthchu1raRf6cvkeDaN8I7JHYMQxiAj5GWSfZBgs2uOZC3gZAmC7cObds5RXvZChV2ALkqvl5GQ7vg3qg5ajQoh8qFmZA3ZCXQYVOcGqaeOFUXjuoiNRGGQZAAUS2LTdDs9cTBKXo0ZD";
      const account_number = "237850543067516"; 
      
      //this is account_number of client. so when click fb login button, should get this so that get fb ads data of the account

      // const access_token = prompt("What is the access token? ");
      // const account_number = prompt("What is your ad account number/ID? ");
      var url =
        "https://graph.facebook.com/v15.0/act_" +
        account_number +
        "/ads?access_token=" +
        access_token +
        "&fields=name";
      //url = 'https://en.wikipedia.org/wiki/Elephant';
      request.get(
        {
          url: url,
          json: true,
          headers: { "User-Agent": "request" },
        },
        (err, res, data) => {
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
    } else {
      res.status(400).send("Error in insert new record");
    }
  });
};

const updateUser = async (req, res) => {
  // console.log(req.body);
  return await User.update(
    {
      user_name: req.body.client_name,
      clientnotes: req.body.client_notes,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  ).then(function (User) {
    if (User) {
      res.send(User);
    } else {
      res.status(400).send("Error in update record");
    }
  });
};

const deleteUser = async (req, res) => {
  // console.log(req.body.id)
  return await User.destroy({
    where: {
      id: req.body.id,
    },
  }).then(function () {
    if (User) {
      res.send("success");
    } else {
      res.status(400).send("Error in delete record");
    }
  });
};

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

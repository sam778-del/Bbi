  
    //   /**
    //    Get the ads from the specific ad (using the id of that ad).
    //   */
    //   function getAdInfo(aid, name) {
    //     var fields =
    //       "fb_row_id,date,acc_id,campaign_id,campaign_name,campaign_objective,placement,platform,impressions,reach,spend,clicks,cpc,ctr,cpm,post_engagment,30sec_view,thru_plays,avg_video_view,100%_video_play,25%_video_play,50%_video_play,75%_video_play,95%_video_play,frequency,play_actions,currency,actions,unqiue_clicks,unqiue_ctr";
    //     fields = "impressions,date_start,date_stop";
    //     var breakdowns = "platform_position,publisher_platform,device_platform";
    //     fields =
    //       "campaign_id,campaign_name,objective,impressions,reach,spend,clicks,cpc,ctr,cpm,inline_post_engagement,video_30_sec_watched_actions,cost_per_thruplay,canvas_avg_view_time,video_p100_watched_actions,video_p50_watched_actions,video_p75_watched_actions,video_p95_watched_actions,frequency,video_play_actions,account_currency,actions,cost_per_unique_click,account_name,conversions,ad_id";

    //     var all_fields = fields + "," + breakdowns;
    //     var iurl = "graph.facebook.com";
    //     var insights =
    //       "/v15.0/" +
    //       aid +
    //       "/insights?fields=" +
    //       fields +
    //       "&breakdowns=" +
    //       breakdowns +
    //       "&&date_preset=maximum&access_token=EAAR9zVP5oQgBAC1H9HvAfZCiENK090oM5RnSHvimBXAqB5mebKZAtCIS2RBthchu1raRf6cvkeDaN8I7JHYMQxiAj5GWSfZBgs2uOZC3gZAmC7cObds5RXvZChV2ALkqvl5GQ7vg3qg5ajQoh8qFmZA3ZCXQYVOcGqaeOFUXjuoiNRGGQZAAUS2LTdDs9cTBKXo0ZD";

    //     const options = {
    //       host: iurl,
    //       port: 443,
    //       path: insights,
    //       method: "GET",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     };

    //     module.exports.getJSON(options, (statusCode, result) => {
    //       // I could work with the resulting HTML/JSON here. I could also just return it
    //       // console.log(`onResult: (${statusCode})\n\n${JSON.stringify(result)}`);

    //       // console.log(statusCode);

    //       console.log("Name of Ad:", name, "data:", result.data);
    //       //daily csv export
    //       cron.schedule("*/3600*24 * * * * *", function () {
    //         let heap = process.memoryUsage().heapUsed / 1024 / 1024;
    //         let date = new Date().toISOString();
    //         const freeMemory =
    //           Math.round((os.freemem() * 100) / os.totalmem()) + "%";
    //         let csv = `${name}\n ${JSON.stringify(result.data)}\n\n`;
    //         fs.appendFile("public/assets/ads.csv", csv, function (err) {
    //           if (err) throw err;
    //           console.log("server details logged");
    //         });
    //       });
    //       //
    //       //date
    //       /*
    //       date_start: '2019-11-05',
    //       date_stop: '2019-12-13'

    //       */
    //     });
    //   }

    //   /**
    //    Get the ads from the ad account id.
    //   */

    //   const access_token =
    //     "EAAR9zVP5oQgBAC1H9HvAfZCiENK090oM5RnSHvimBXAqB5mebKZAtCIS2RBthchu1raRf6cvkeDaN8I7JHYMQxiAj5GWSfZBgs2uOZC3gZAmC7cObds5RXvZChV2ALkqvl5GQ7vg3qg5ajQoh8qFmZA3ZCXQYVOcGqaeOFUXjuoiNRGGQZAAUS2LTdDs9cTBKXo0ZD";
    //   const account_number = "237850543067516"; 
      
    //   //this is account_number of client. so when click fb login button, should get this so that get fb ads data of the account

    //   // const access_token = prompt("What is the access token? ");
    //   // const account_number = prompt("What is your ad account number/ID? ");
    //   var url =
    //     "https://graph.facebook.com/v15.0/act_" +
    //     account_number +
    //     "/ads?access_token=" +
    //     access_token +
    //     "&fields=name";
    //   //url = 'https://en.wikipedia.org/wiki/Elephant';
    //   request.get(
    //     {
    //       url: url,
    //       json: true,
    //       headers: { "User-Agent": "request" },
    //     },
    //     (err, res, data) => {
    //       if (err) {
    //         console.log("Error:", err);
    //       } else if (res.statusCode !== 200) {
    //         console.log("Status:", res.statusCode);
    //       } else {
    //         // data is already parsed as JSON:
    //         // console.log("data.data", data.data);

    //         for (let i = 0; i < data.data.length; i++) {
    //           //console.log("The number is " + data.data[i].id);
    //           getAdInfo(data.data[i].id, data.data[i].name);
    //         }
    //       }
    //     }
    //   );
    // } else {
    //   res.status(400).send("Error in insert new record");
    // }
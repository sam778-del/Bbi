/*  EXPRESS */
const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const config = require("./config");
const {
  GoogleAdsApi,
  MutateOperation,
  ResourceNames,
  enums,
} = require("google-ads-api");
const url = require("url");
const AdwordsUser = require("node-adwords").AdwordsUser;
const cron = require("node-cron");
const fs = require("fs");
const os = require("os");

const {
  user,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("./controllers/user");
var google_token = "";
var fb_token = "";
const db = require("./models");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(express.static(__dirname + "/public"));

const port = process.env.PORT || 80;
app.listen(port, () => console.log("App listening on port " + port));

var passport = require("passport");
const { createNullProtoObjWherePossible } = require("ejs/lib/utils");
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

// app.get('/user', user);

app.get("/crud", getUser);

app.post("/user/create-user", createUser);

app.post("/user/update-user", updateUser);

app.post("/user/delete-user", deleteUser);

app.get("/", function (req, res) {
  res.render("pages/auth");
});

app.get("/success", (req, res) => {
  res.render("pages/success", { user: userProfile });
});

app.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */

var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID = '618230349104-d2h3joijmdq1f9gmsak0n3hmn4cj0mg9.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost/oauth2/test",
    },
    function (accessToken, refreshToken, profile, done) {
      google_token = accessToken;
      console.log(google_token)
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

app.get(
  "/oauth2/test",
  passport.authenticate("google", {
    scope: ["https://adwords.google.com/api/adwords/cm", "profile", "email"],
  }),
  async function (req, res) {
    res.redirect("/success");
  }
);

app.get(
  "/error",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    res.redirect("/test");
  }
);

/* FaceBook login */
var FacebookStrategy = require('passport-facebook');
const FB_APP_ID = '1284203282349427';
const FB_APP_SECRET = 'nfenwOsKHLfci6cuVhkCOapVl7s';

passport.use(new FacebookStrategy({
  clientID: FB_APP_ID,
  clientSecret: FB_APP_SECRET,
  callbackURL: 'http://localhost/auth/facebook/login'
},
  function (accessToken, refreshToken, profile, cb) {
    fb_token = accessToken;
    console.log(accessToken)
  }
));

app.get(
  '/auth/facebook/login',
  passport.authenticate('facebook', {
    scope: ['public_profile', 'email']
  }),
  async function (req, res) {
    res.redirect("/success");
  }
)

// app.get('/', function (req, res) {
//   res.render('index.ejs'); // load the index.ejs file
// });


// migrate the users table in gamedb Database
// db.sequelize
//   .sync()
//   .then(() => {
//     console.log("ok");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

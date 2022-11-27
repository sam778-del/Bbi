/*  EXPRESS */
require('dotenv').config({path: __dirname + '/.env'})
const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const config = require("./config");

const url = require("url");
const AdwordsUser = require("node-adwords").AdwordsUser;
const cron = require("node-cron");
const fs = require("fs");
const os = require("os");

const models = require("./models");
const User = models.users;
const Account = models.accounts;


const {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  clientCreate,
} = require("./controllers/user");

const {
  authFacebook
} = require("./controllers/facebook");

var google_token = "";
var refresh_token = "";
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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("App listening on port " + port));

var passport = require("passport");
const { createNullProtoObjWherePossible } = require("ejs/lib/utils");
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

//CLient Fundctions
app.get('/auth/facebook/auth', authFacebook)

//Export video ads from Facebook
cron.schedule('*/5 * * * * *', async () => {
  // try {
  //     const users = await User.findAll({
  //       order: [["id", "ASC"]],
  //     });
  //     if (users) {
  //       console.log(users);
  //     }
  // } catch (err) {
  //     res.status(404).json({
  //       message: err,
  //     });
  // }
});

// app.get('/user', user);
app.get("/crud", getUser);
app.post("/user/create-user", createUser);
app.post("/user/update-user", updateUser);
app.post("/user/delete-user", deleteUser);
app.get("/", function (req, res) {
  res.render("pages/auth");
});
app.get("/success", (req, res) => {
  res.render("pages/success", { user: userProfile, accessToken: google_token, refresh_token: refresh_token });
});
app.get("/error", (req, res) => res.send("error logging in"));
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

//create client
app.get("/client/create", clientCreate);



// Data Pipelines and Workflows


/*  Google AUTH  */

var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CLIENT_REDIRECT_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      google_token = accessToken;
      userProfile = profile;
      refresh_token = refreshToken;
      console.log(refreshToken);
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
const FB_APP_ID = process.env.FACEBOOK_APP_ID;
const FB_APP_SECRET = process.env.FACEBOOK_CLIENT_SECRET;

passport.use(new FacebookStrategy({
  clientID: FB_APP_ID,
  clientSecret: FB_APP_SECRET,
  callbackURL: process.env.FACEBOOK_REDIRECT_URL
},
  function (accessToken, refreshToken, profile, done) {
    google_token = accessToken;
    userProfile = profile;
    refresh_token = refreshToken;
    console.log(refreshToken);
    return done(null, userProfile);
  }
));

app.get(
  '/auth/facebook/app',
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

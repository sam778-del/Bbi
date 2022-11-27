const models = require("../models");
const User = models.users;
const Account = models.accounts;

const {
  authFacebook
} = require("./facebook");

("use strict");
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
      message: err,
    });
  }
};

const createUser = async (req, res) => {
  try {
    //create the user
    User.create({
      user_name: req.body.client_name,
      lifetime_export: new Date(),
      lastdaily_export: new Date(),
      validity: "a",
      provider: req.body.provider,
      refresh_token: req.body.refresh_token,
      g_account: req.body.g_account,
      fb_account: req.body.fb_account,
      sector: req.body.main_sector,
      subsector: req.body.sub_sector,
      clientnotes: req.body.client_notes,
    }).then(async function(User) {
      Account.create({
        account_id: req.body.account_id,
        lifetime_export: new Date(),
        lastdaily_export: new Date(),
        validity: "a",
        client_id: User.id
      }).then(data => {
        console.log("Created new user! ✅")
        console.log(data.account_id)
        switch(req.body.provider) {
          case 'facebook':
            var fbParam = { 
              user_id: User.id, 
              access_token: User.fb_account, 
              account_id: data.account_id
            };
            authFacebook(fbParam);
            break;
          default:
            // code block
        }
        res.redirect("/crud");
      })
      .catch(err => {
        console.log("Error creating a new user!!!." + err)
        return res.status(409).send({
          message: "An error has occured while creating a new user"
        })
      })
    })
  } catch (err) {
    console.log(err);
  }
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

const clientCreate = (req, res) => {
  try {
    res.render("pages/client/create");
  } catch (err) {
    res.status(404).render("pages/error", { message: err });
  }
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  clientCreate
};

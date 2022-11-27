// const cron = require("node-cron");
// const fs = require("fs");
// const os = require("os");
var popup;

$(document).ready(() => {
  var id;
  $("#save").click(() => {
    var client_name = $("#client_name").val();
    var main_sector = "car";
    var sub_sector = "luxury car";
    var client_notes = $("#client_notes").val();
    var provider = $('#provider').val();
    var google_token = "";
    var facebook_token = "";
    var accountID = "";
    var refreshToken = $('#refresh_token').val();

    if(provider == "google") {
      google_token = $('#access_token').val();
      accountID = $('#google_customer_id').val();
      facebook_token = "";
    }

    if(provider == "facebook") {
      google_token = "";
      facebook_token = $('#access_token').val();
      accountID = $('#fb_account_id').val();
    }

    $.post(
      "/user/create-user",
      {
        client_name: client_name,
        main_sector: main_sector,
        sub_sector: sub_sector,
        provider: provider,
        refresh_token: refreshToken,
        g_account: google_token,
        account_id: accountID,
        fb_account: facebook_token,
        client_notes: client_notes,
      },
      function (recv, data) {
        if (data == "success") {
          window.location.reload(true);
        }
      }
    );
  });

  $("td> .btn_edit").on("click", function (e) {
    // console.log(e.target.id)
    id = e.target.id;
    $("#client_name_edit").val($(this).parent().siblings("#user_name").text());
    $("#client_notes_edit").val(
      $(this).parent().siblings("#client_notes").val()
    );
  });

  $("#update").click(() => {
    var client_name = $("#client_name_edit").val();
    var client_notes = $("#client_notes_edit").val();
    $.post(
      "/user/update-user",
      {
        id: id,
        client_name: client_name,
        client_notes: client_notes,
      },
      function (recv, data) {
        if (data == "success") {
          window.location.reload(true);
        }
      }
    );
  });

  $("td> .btn_remove").click((e) => {
    $.post(
      "/user/delete-user",
      {
        id: e.target.id,
      },
      function (recv, data) {
        if (data == "success") {
          window.location.reload(true);
        }
      }
    );
  });
});

function popup() {
  popup = window.open("/oauth2/test", "_blank", (width = 100), (height = 50));
}

function loginFacebook() {
  popup = window.open("/auth/facebook/app", "_blank", (width = 100), (height = 50));
}

$(document).ready(function() {
  $('#fbAccount').hide();
  $('#gAccount').hide();
  $('#save').attr('disabled', 'disabled');
  window.addEventListener('message', event => {
    if (event.origin === 'http://localhost:3000') {
      if (event.data.type == "close") {
        $('#provider').val(event.data.provider);
        $('#access_token').val(event.data.token);
        $('#account_id').val(event.data.profileId);
        switch (event.data.provider) {
          case 'facebook':
            $('#fbAccount').show();
            break;
          default:
            $('#gAccount').show();
            break;
        }
        $('#save').removeAttr('disabled', 'disabled');
      }
    }
  });
});
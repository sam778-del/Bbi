// const cron = require("node-cron");
// const fs = require("fs");
// const os = require("os");

$(document).ready(() => {
  var id;
  $("#save").click(() => {
    var client_name = $("#client_name").val();
    var main_sector = "car";
    var sub_sector = "luxury car";
    var client_notes = $("#client_notes").val();
    $.post(
      "/user/create-user",
      {
        client_name: client_name,
        main_sector: main_sector,
        sub_sector: sub_sector,
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
  window.open("/oauth2/test", "", (width = 100), (height = 50));
  // newWindow.onload = function() {
  //     newWindow.close();
  //     alert(newWindow.closed); // true
  // };
}

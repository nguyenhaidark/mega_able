$(function () {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/author/get",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + localStorage.getItem("key")
      );
    },
    success: function (data) {
      var tr = "";
      for (var i = 0; i < data.length; i++) {
        let status;
        if (data[i].status == true) {
          status = "show";
        } else {
          status = "hiden";
        }
        tr +=
          "<tr><td>" +
          data[i].id +
          "</td><td>" +
          data[i].name +
          "</td><td>" +
          status +
          "</td><td>" +
          data[i].createdDate +
          "</td><td>" +
          data[i].updatedDate +
          '</td><td><a href="#" class="btn btn-primary" onclick="editauthor(\'' +
          data[i].id +
          '\')">Edit</a> <a href="#" class="btn btn-danger" onclick="deleteauthor(\'' +
          data[i].id +
          "')\">Delete</a></td></tr>";
      }
      $("#tblauthor").append(tr);
    },
    error: function () {
      alert("Unauthorized");
    },
  });

  $("#btnadd").click(function () {
    $("#action").html("add");
    $("#myModal").modal("show");
    $("#formDataHtml").trigger("reset");
  });

  $("#btnsave").click(function () {
    var action = $("#action").html();
    var status = document.getElementsByName("status");
    var valstatus;
    for (i = 0; i < status.length; i++) {
      if (status[i].checked) valstatus = status[i].value;
    }
    let formData = new FormData();
    formData.append("id", $("#idAuthor").val());
    formData.append("name", $("#name").val());
    formData.append("status", valstatus);
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    if (action == "add") {
      $.ajax({
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(object),
        url: "http://localhost:8080/author/add",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Bearer " + localStorage.getItem("key")
          );
        },
        success: function () {
          location.reload();
        },
        error: function () {
          alert("Unauthorized");
        },
      });
    } else {
      $.ajax({
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(object),
        url: "http://localhost:8080/author/update",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Bearer " + localStorage.getItem("key")
          );
        },
        success: function (d) {
          location.reload();
        },
        error: function () {
          alert("Unauthorized");
        },
      });
    }
  });
});

function editauthor(id) {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/author/findById?id=" + id,
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + localStorage.getItem("key")
      );
    },
    success: function (data) {
      $("#idAuthor").val(data.id);
      $("#name").val(data.name);
      if (data.status == true) {
        document.getElementById("true").checked = true;
      } else {
        document.getElementById("false").checked = true;
      }
      $("#myModal").modal("show");
      $("#action").html("edit");
    },
    error: function () {
      alert("Unauthorized");
    },
  });
}

function deleteauthor(id) {
  if (confirm("You may want to delete ?")) {
    $.ajax({
      type: "DELETE",
      url: "http://localhost:8080/author/delete?id=" + id,
      beforeSend: function (xhr) {
        xhr.setRequestHeader(
          "Authorization",
          "Bearer " + localStorage.getItem("key")
        );
      },
      success: function (d) {
        window.location.reload();
      },
      error: function () {
        alert("This data is being used");
      },
    });
  }
}

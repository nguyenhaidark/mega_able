$(function () {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/bill/get",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + localStorage.getItem("key")
      );
    },
    success: function (data) {
      var tr = "";
      for (var i = 0; i < data.length; i++) {
        let books = data[i].books.map((b) => b.name);
        let status;
        if (data[i].status == true) {
          status = "confirm";
        } else {
          status = "waiting";
        }
        tr +=
          "<tr><td>" +
          data[i].id +
          "</td><td>" +
          data[i].totalPrice +
          "</td><td>" +
          books +
          "</td><td>" +
          status +
          "</td><td>" +
          data[i].createdDate +
          "</td><td>" +
          data[i].updatedDate +
          '</td><td><a href="#" class="btn btn-primary" id="id" onclick="editBill(' +
          data[i].id +
          ')">Edit</a> <a href="#" class="btn btn-danger" id="id" onclick="deleteBill(' +
          data[i].id +
          ')">Delete</a></td></tr>';
      }
      $("#tblbill").append(tr);
    },
    error: function () {
      alert("Unauthorized");
    },
  });
  $("#btnsave").click(function () {
    var action = $("#action").html();
    var status = document.getElementsByName("status");
    var valstatus;
    for (i = 0; i < status.length; i++) {
      if (status[i].checked) valstatus = status[i].value;
    }
    let formData = new FormData();
    formData.append("id", $("#idBill").val());
    formData.append("status", valstatus);
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    if (action == "edit") {
      $.ajax({
        type: "PUT",
        url: "http://localhost:8080/bill/update",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            "Bearer " + localStorage.getItem("key")
          );
        },
        contentType: "application/json",
        data: JSON.stringify(object),
        success: function () {
          location.reload();
        },
        error: function () {
          alert("Unauthorized");
        },
      });
    }
  });
});

function editBill(id) {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/bill/findById?id=" + id,
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        "Bearer " + localStorage.getItem("key")
      );
    },
    success: function (data) {
      $("#idBill").val(data.id);
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

function deleteBill(id) {
  if (confirm("You may want to delete ?")) {
    $.ajax({
      type: "DELETE",
      url: "http://localhost:8080/bill/delete?id=" + id,
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

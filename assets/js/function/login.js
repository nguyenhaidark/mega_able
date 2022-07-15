function signin() {
  $.ajax({
    type: "POST",
    url: "http://localhost:8080/auth/signin",
    contentType: "application/json",
    data: JSON.stringify({
      username: $("#username").val(),
      password: $("#password").val(),
    }),
    success: function (data) {
      localStorage.setItem("key", data.token);
      localStorage.setItem("name", data.name);
      location = "index.html";
    },
    error: function () {
      alert("Unauthorized");
    },
  });
}
function logout() {
  localStorage.removeItem("key");
  localStorage.removeItem("name");
  location = "auth-normal-sign-in.html";
}

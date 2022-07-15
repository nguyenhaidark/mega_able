check();
function check() {
  if (localStorage.getItem("key") == null) {
    location = "auth-normal-sign-in.html";
  }
}

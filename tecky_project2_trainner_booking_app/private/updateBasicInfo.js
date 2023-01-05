async function loginUserInfo() {
  let res = await fetch("/currentUser");
  let data = await res.json();
  let username = document.getElementById("username");
  username.value = data.username;
  let phone = document.getElementById("phone");
  phone.value = data.phone;
  let gender = document.getElementById("gender");
  gender.value = data.gender;
  let age = document.getElementById("age");
  age.value = data.age;
  let headerUsername = document.getElementById("headerUsername");
  headerUsername.textContent = `Welcome! ${data.username}`;
}
loginUserInfo();

const form = document.querySelector("#updateBasicInfo");

// console.log("form before:"+ form);
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  let form = event.target;

  const formData = new FormData(form);

  const response = await fetch(form.action, {
    method: form.method, //post
    body: formData,
  });

  let result = await response.json();

  if (response.status == 400) {
    alert(`Error: ${result.message}`);
    return;
  }
  if (response.status == 200) {
    alert(` ${result.message} `);
  }
  window.location = "/";
});

async function loadHeaderName() {
  let res = await fetch("/currentUser");
  let data = await res.json();
  let headerUsername = document.getElementById("headerUsername");
  headerUsername.textContent = `Welcome! ${data.username}`;
}
loadHeaderName();

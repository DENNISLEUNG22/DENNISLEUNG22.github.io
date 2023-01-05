const form = document.querySelector("#updateEmail");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formObject = {};

  formObject["email"] = form.email.value;

  const response = await fetch(form.action, {
    method: form.method, //post
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
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
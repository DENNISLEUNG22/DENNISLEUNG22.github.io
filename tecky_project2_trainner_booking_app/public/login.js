const form = document.querySelector("#login");

form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const formObject = {};

  formObject["email"] = form.email.value;
  formObject["password"] = form.password.value;
  console.log(form);
  const response = await fetch(form.action, {
    method: form.method, //post
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  });

  let result = await response.json();

  if (response.status == 400) {
    alert(`Error: ${result.message} `);
    return;
  } 
  window.location = '/'
});

async function loadHeaderName() {
  let res = await fetch("/currentUser");
  let data = await res.json();
  let headerUsername = document.getElementById("headerUsername");
  headerUsername.textContent = `Welcome! ${data.username}`;
}
loadHeaderName();
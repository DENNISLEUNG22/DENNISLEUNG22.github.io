const form = document.querySelector("#register");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const formObject = {};

  formObject["username"] = form.username.value;
  formObject["email"] = form.email.value;
  formObject["password"] = form.password.value;
  formObject["age"] = form.age.value;
  formObject["gender"] = form.gender.value;
  formObject["phone"] = parseInt(form.phone.value);

  if (isNaN(formObject.phone)) {
    alert(`Error: 聯絡電話只能輸入數字 `);
    return;
  }

  if (formObject.gender == "0") {
    alert(`Error: 請選擇您的性別 `);
    return;
  }
  if (formObject.age == "0") {
    alert(`Error: 請選擇您的年齡層 `);
    return;
  }

  const response = await fetch(form.action, {
    method: form.method, //post
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formObject),
  });

  let result = await response.json();

  if (response.status == 400) {
    console.log("success result: ," , result.message)
    alert(`Error: ${result.message}`);
    return;
  }
  if (response.status == 200) {
    alert(` ${result.message} `);
  }
  window.location = "/login.html";
});

async function loadHeaderName() {
  let res = await fetch("/currentUser");
  let data = await res.json();
  let headerUsername = document.getElementById("headerUsername");
  headerUsername.textContent = `Welcome! ${data.username}`;
}
loadHeaderName();

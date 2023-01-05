const button = document.querySelector("#checkout_button")
console.log("link 2: ," , button);
button.addEventListener("click", () => {
  console.log("link 4: ," , button);
  fetch("http://localhost:8080/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        { id: 1, quantity: 1},
      ],
    }),
  })
    .then(res => {
      if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json))
    })
    .then(({ url }) => {
      window.location = url
    })
    .catch(e => {
      console.error("fail to click: ,")
    })
})




async function loadHeaderName() {
    let res = await fetch("/currentUser");
    let data = await res.json();
    let headerUsername = document.getElementById("headerUsername");
    headerUsername.textContent = `Welcome! ${data.username}`;
  }
  loadHeaderName();
  
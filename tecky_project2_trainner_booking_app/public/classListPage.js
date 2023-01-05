const searchParams = new URLSearchParams(location.search);
const event_id = searchParams.get("event_id");

let cardTemplate = document.querySelector(".card");
console.log(cardTemplate.querySelector("#user-title-mum"));
cardTemplate.remove();

document.querySelector("#user-title-mum");
async function getClass(date) {
  console.log("event_id frontend:", event_id);

  let res = await fetch(`/getClass?event_id=${event_id}`);
  let dates = await res.json();
  if (dates.length == 0) {
    document.querySelector("#hiddenID").classList.toggle("show");
  }

  for (let date of dates) {
    let card = cardTemplate.cloneNode(true);

    card.querySelector("#user-title").textContent = date.username;
    card.querySelector("#email").textContent = date.email;
    card.querySelector("#phone").textContent = date.phone;
    if (date.profile_icon) {
      card.querySelector(".avator").src = date.profile_icon;
    }

    document.querySelector("#card-mum").appendChild(card);
  }
}

getClass();

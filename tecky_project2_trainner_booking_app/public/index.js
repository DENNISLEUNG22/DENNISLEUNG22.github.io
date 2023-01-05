// ------- type looper
let typeOuter = document.querySelector("#typeContainer");
let innerTypeId = document.querySelector("#mainEventTypeId");
let cardTemplate = document.querySelector(".card");
// console.log("cardTemplate :", cardTemplate);
// console.log("cardTemplate trainer:", cardTemplate.querySelector(".trainer"));
cardTemplate.remove();

//-------

async function getDefaultEvent() {
  const res = await fetch("/events");
  const events = await res.json();

  for (let event of events) {
    let card = cardTemplate.cloneNode(true);

    // document.querySelector("#card-container").removeChild(card);

    // console.log(card.querySelector(".card-title"));
    // console.log(card.querySelector(".trainer"));
    // console.log(card.querySelector(".date"));
    // console.log(card.querySelector(".area"));
    // console.log(card.querySelector(".address"));
    // console.log(card.querySelector(".caption"));
    // console.log(card.querySelector(".card-img"));

    card.querySelector(".card-title").textContent += event.event_name;
    card.querySelector(
      "#event-link"
    ).href = `/confirmEventPage.html?id=${event.id}`;
    card.querySelector(".trainer").textContent += event.username;
    card.querySelector(".date").textContent += event.date;
    card.querySelector(".area").textContent += event.district_name;
    card.querySelector(".caption").textContent += event.caption;
    card.querySelector("img").src = "/" + event.event_profile_photo;

    document.querySelector("#card-container").appendChild(card);
  }
}

//-------
//-------

//-------
//-------
async function getTheType() {
  let res = await fetch("/getTheType");
  let data = await res.json();
  for (let type of data) {
    let typeDiv = innerTypeId.cloneNode(true);
    typeDiv.textContent = type.name;
    typeDiv.value = type.id;
    typeOuter.appendChild(typeDiv);
  }
}
// ------------------- hk island fliter
let hkislandContainer = document.querySelector("#hkIsland");
let hkIslandGroupOption = document.querySelector("#hkIslandGroup");

async function getLocalEventOfHK() {
  let res = await fetch("/localEventOfHK");
  let data = await res.json();
  for (let option of data) {
    let optionDiv = hkIslandGroupOption.cloneNode(true);
    optionDiv.textContent = option.name;
    optionDiv.value = option.id;
    hkislandContainer.appendChild(optionDiv);
  }
  hkislandContainer.removeChild(hkislandContainer.firstElementChild);
}
// ------------------ kowloon fliter
let kowloonContainer = document.querySelector("#kowloon");
let kowloonGroupOption = document.querySelector("#kowloonGroup");

async function getLocalEventOfKW() {
  let res = await fetch("/localEventOfKW");
  let data = await res.json();
  for (let option of data) {
    let optionDiv = kowloonGroupOption.cloneNode(true);
    optionDiv.textContent = option.name;
    optionDiv.value = option.id;

    kowloonContainer.appendChild(optionDiv);
  }
  kowloonContainer.removeChild(kowloonContainer.firstElementChild);
}

// ------------------ New Territor West fliter

let ntWestContainer = document.querySelector("#ntWest");
let ntWestGroupOption = document.querySelector("#ntWestGroup");

async function getLocalEventOfNTW() {
  let res = await fetch("/localEventOfNTW");
  let data = await res.json();
  for (let option of data) {
    let optionDiv = ntWestGroupOption.cloneNode(true);
    optionDiv.textContent = option.name;
    optionDiv.value = option.id;
    ntWestContainer.appendChild(optionDiv);
  }
  ntWestContainer.removeChild(ntWestContainer.firstElementChild);
}

// ------------------ New Territor East fliter

let ntEastContainer = document.querySelector("#ntEast");
let ntEastGroupOption = document.querySelector("#ntEastGroup");

async function getLocalEventOfNTE() {
  let res = await fetch("/localEventOfNTE");
  let data = await res.json();
  for (let option of data) {
    let optionDiv = ntWestGroupOption.cloneNode(true);
    optionDiv.textContent = option.name;
    optionDiv.value = option.id;
    ntEastContainer.appendChild(optionDiv);
  }
  ntEastContainer.removeChild(ntEastContainer.firstElementChild);
}

// ---------------- subEvent

// async function getSubEvent() {
//   let res = await fetch("/getSubEvent");
//   let data = await res.json();
//   for (let sub of data) {
//     let subEV = subEventGroup.cloneNode(true);
//     subEV.textContent = sub.name;
//     subEV.value = sub.id;
//     subEvent.appendChild(subEV);
//   }
// }

// --base on main id > sub >
let subEvent = document.querySelector("#subEvent");
let subEventGroup = document.querySelector("#subEventId");
document
  .querySelector("#typeContainer")
  .addEventListener("change", async () => {
    let typeid = document.querySelector("#typeContainer").value;
    let res = await fetch(`/getSubEvent?typeId=${typeid}`);
    let data = await res.json();
    subEvent.textContent = "";
    for (let sub of data) {
      let subEV = subEventGroup.cloneNode(true);
      subEV.textContent = sub.name;
      subEV.value = sub.id;
      subEvent.appendChild(subEV);
    }
    // console.log(subEvent);
  });
// ---------------------------------//
// **************sumbit************//
//***************card**************//
// ------------------------------//
document
  .querySelector("#submit-button")
  .addEventListener("click", async function (event) {
    const formObject = {};
    //
    let date = document.querySelector("#eventDate").value;
    let district_id = document.querySelector("#districtId").value;
    let sub_event_type_id = document.querySelector("#subEvent").value;

    //
    const res = await fetch(
      `/events?date=${date}&&district_id=${district_id}&&sub_event_type_id=${sub_event_type_id}`
    );
    //
    const events = await res.json();

    document.querySelector("#card-container").innerHTML = "";
    for (let event of events) {
      let card = cardTemplate.cloneNode(true);

      card.querySelector(".card-title").textContent += event.event_name;
      card.querySelector(
        "#event-link"
      ).href = `/confirmEventPage.html?id=${event.id}`;
      card.querySelector(".trainer").textContent += event.username;
      card.querySelector(".date").textContent += event.date;
      card.querySelector(".area").textContent += event.district_name;
      card.querySelector(".caption").textContent += event.caption;
      card.querySelector("img").src = "/" + event.event_profile_photo;

      document.querySelector("#card-container").appendChild(card);
    }
    console.log("events.length:", events.length);
    if (events.length == 0) {
      console.log("length 0:", events.length);
      document.querySelector("#hiddenEvent").classList.toggle("show");
    }

    // document.querySelector("#card-container").removeChild(card);
  });

//
// let day = new Date().getDate();
// let month = new Date().getMonth() + 1;
// let year = new Date().getFullYear();
// let date = year + "-" + month + "-" + day;

document.querySelector("#eventDate").value = "0";

/***************card**************/

// getSubEvent();
getLocalEventOfHK();
getLocalEventOfKW();
getLocalEventOfNTW();
getLocalEventOfNTE();
getTheType();
getDefaultEvent();

async function loadHeaderName() {
  let res = await fetch("/currentUser");
  let data = await res.json();
  let headerUsername = document.getElementById("headerUsername");
  headerUsername.textContent = `Welcome! ${data.username}`;
}
loadHeaderName();

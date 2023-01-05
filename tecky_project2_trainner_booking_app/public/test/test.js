let eventContainer = document.querySelector("#main-event-container");
let eventDiv = document.querySelector(".event");
eventDiv.remove();
fetch("/mainEvent")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    for (let event of data) {
      let div = eventDiv.cloneNode(true);
      div.textContent = event.name;
      eventContainer.appendChild(div);
    }
  });

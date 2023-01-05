const form = document.querySelector('#create');

form.addEventListener('submit', async (event)=>{
    event.preventDefault()

    const formData = new FormData(form)

    const response = await fetch(form.action, {
      method: form.method,  //post
      body: formData,
    })

    // let response = await fetch(form.action, {
    //     method: form.method,
    //     headers: {"Content-type": "application/json"},
    //     body: JSON.stringify(formObj)
    // })

    // console.log(response);
    // console.log(response.status);

    let result = await response.json()

    if (response.status == 400) {
        alert(`Error: ${result.message} `)
        return
    }
    else if(response.status == 200){
        alert(`${result.message}`)
        return
    }
  
    // window.location = '/'
})

//success for main event selection from DB
// const selectMainEvent = document.querySelector('#mainEventType');

// window.onload = async () => {

//     const response = await fetch("/selectMainEvent");
//     const result = await response.json();

//     for(let v of result){
//         console.log(v);
//         selectMainEvent.innerHTML += `
//             <option value="${v.id}" class="event_type">${v.name}</option>
//         `
//     }
    
// }

const selectMainEvent = document.querySelector('#mainEventType');
const selectSubEvent = document.querySelector('#subEventType');
window.onload = async () => {

    const responseMain = await fetch("/selectMainEvent");
    const resultMain = await responseMain.json();

    for(let v of resultMain){
        console.log(v);
        selectMainEvent.innerHTML += `
            <option value="${v.id}" class="event_type">${v.name}</option>
        `
        
    }
    const responseSub = await fetch("/selectSubEvent")
    const resultSub = await responseSub.json();

    for(let v of resultSub){
        console.log(v);
        selectSubEvent.innerHTML += `
            <option value="${v.id}" class="event_type">${v.name}</option>
        `
        
}
}






// selectMainEvent.addEventListener('click', async (event)=>{

//     const response = await fetch("/selectMainEvent")
//     const result = await response.json()
//     // console.log(result);
//     for(let i = 1 ; i < result.length; i++){
//         let node = eventType.cloneNode(true)
//         node.querySelector()
//     }
// })



//success for sub event selection from DB
// const selectSubEvent = document.querySelector('#subEventType');

// window.onload = async () => {
//     const response = await fetch("/selectSubEvent")
//     const result = await response.json();

//     for(let v of result){
//         console.log(v);
//         selectSubEvent.innerHTML += `
//             <option value="${v.id}" class="event_type">${v.name}</option>
//         `
//     }
// }

async function loadHeaderName() {
    let res = await fetch("/currentUser");
    let data = await res.json();
    let headerUsername = document.getElementById("headerUsername");
    headerUsername.textContent = `Welcome! ${data.username}`;
  }
  loadHeaderName();
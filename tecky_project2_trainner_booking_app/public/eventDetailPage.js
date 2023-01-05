let url = new URL(window.location)
console.log(url);
let eventID = url.searchParams.get('id')
// let myGF = url.searchParams.get('gf')
// console.log({eventID});
// console.log({myGF});
// fetch(`/eventDetails/${eventID}`).then(res=>res.json()).then(data=>{console.log(data);})

const eventDetails = document.querySelector('#eventDetailsBody')

window.onload = async () => {
 
        const responseEventDetails = await fetch(`/eventDetails/${eventID}`);
        const resultEventDetails = await responseEventDetails.json();

        for(let v of resultEventDetails){
        eventDetails.innerHTML +=`
        <div class="row">
        <div class="col-sm-12">
        <div class="card text-center" id="box-${v.id}">
        <div class="card-body">
        <h5 class="card-title">${v.event_name}</h5>
        <img src="/${v.event_profile_photo}" class="img-fluid" alt="Event Profile Photo">
        <p><h7 class="card-text">導師:${v.username}</h7></p>
        <p><h7 class="card-text">電郵: ${v.email}</h7></p>
        <p><h7 class="card-text">聯絡電話: ${v.phone}</h7></p>
        <p><h7 class="card-text">日期: ${v.date}</h7></p>
        <p><h7 class="card-text">開始時間: ${v.start_time} </h7></p>
        <p><h7 class="card-text">完結時間: ${v.end_time} </h7></p>
        <p><h7 class="card-text">所在地區: ${v.district_name} </h7></p>
        <p><h7 class="card-text">詳細地址: ${v.full_address} </h7></p>
        <p><h7 class="card-text">活動人數: ${v.class_size} </h7></p>
        
        <p><h7 class="card-text">活動細類: ${v.sub_event_type_name}</h7></p>
        <p><h7 class="card-text">建議年齡層: ${v.suggest_age_group_name}</h7></p>
        <p><h7 class="card-text">其他活動詳情: ${v.caption} </h7></p>
   
         </div>
         </div>
         </div>
         </div>
        `

        }
    }

 async function loadHeaderName() {
  let res = await fetch("/currentUser");
  let data = await res.json();
  let headerUsername = document.getElementById("headerUsername");
  headerUsername.textContent = `Welcome! ${data.username}`;
}
loadHeaderName();
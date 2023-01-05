const showJointEvent = document.querySelector('#eventCardBody');
// const linkDetails = document.querySelector('#eventCardBody').href = `/eventDetailsPage.html?id=${v.id}`;


window.onload = async () => {
    // console.log("Hello");
    try {
        const response = await fetch("/jointEvent");
        const result = await response.json();

    
        for(let v of result){
            // console.log(v);
            // const dt = new Date(${v.date})
            // const dtFormat = day(dt.getDate()) + '-' +allmonths[dt.getMonth()] + '-' + dt.getFullYear()
            
            showJointEvent.innerHTML +=`
            <div class="row">
            <div class="col-sm-12">
       
            <div class="card text-center linkControl" id="box-${v.id}" >
            <a href="/eventDetailPage.html?id=${v.id}">
            <div class="card-body" >
            <h5 class="card-title">${v.event_name}</h5>
            <img src="/${v.event_profile_photo}" class="img-fluid" alt="Event Profile Photo"></img>
            <p><h7 class="card-text">Trainer: ${v.username}</h7></p>
            <p><h7 class="card-text">Date: ${v.date}</h7></p>
            <p><h7 class="card-text">Start Time: ${v.start_time} </h7></p>
            <p><h7 class="card-text">End Time: ${v.end_time} </h7></p>

            <p><h7 class="card-text">Location: ${v.district_name} </h7></p>
            
            </div>
            </a>
            </div>
           
            </div>
            </div>

             `  
        }
    
        
    } catch (error) {
        console.log(error);
    }
        


}



async function loadHeaderName() {
    let res = await fetch("/currentUser");
    let data = await res.json();
    let headerUsername = document.getElementById("headerUsername");
    headerUsername.textContent = `Welcome! ${data.username}`;
  }
  loadHeaderName();
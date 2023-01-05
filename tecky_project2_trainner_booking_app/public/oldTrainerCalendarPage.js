
const showAllEvent = document.querySelector('#eventCardBody');
const deleteEvent = document.querySelector('#deleteEvent-btn');

window.onload = async () => {
    // console.log("Hello");
    try {
        const responseEventList = await fetch("/eventList");
        const resultEventList = await responseEventList.json();

        // console.log(resultEventList);
    
        for(let v of resultEventList){
            // console.log(v);
            // const dt = new Date(${v.date})
            // const dtFormat = day(dt.getDate()) + '-' +allmonths[dt.getMonth()] + '-' + dt.getFullYear()
            
            showAllEvent.innerHTML +=`
            <div class="row">
            <div class="col-sm-12">
            <div class="card text-center linkControl" id="box-${v.id}">
            <a href="/eventDetailPage.html?id=${v.id}">
            <div class="card-body">
            <h5 class="card-title">${v.event_name}</h5>
            <div><img src="/${v.event_profile_photo}" class="img-fluid" alt="Event Profile Photo"></div>
            <p><h7 class="card-text">Trainer: ${v.username}</h7></p>
            <p><h7 class="card-text">Date: ${v.date}</h7></p>
            <p><h7 class="card-text">Start Time: ${v.start_time} </h7></p>
            <p><h7 class="card-text">End Time: ${v.end_time} </h7></p>

            <p><h7 class="card-text">Location: ${v.district_name} </h7></p>
            </a>
            <p>
                <a href="/classListPage.html?event_id=${v.id}"><button class="btn btn-primary"> Class List</button></a>
            </p>

            <p>
                <button class="btn btn-primary" id="deleteEvent-${v.id}">Delete Event</button>
             </p>
             </div>
             

             </div>
             </div>
             </div>

             `  
        }
    
        for(let v of resultEventList){
            const ele = document.getElementById("deleteEvent-" + v.id)
            ele.addEventListener('click',async() =>{
                console.log(v.id);
                const responseNoGame = await fetch("/noGame/" + v.id, {
                    method:"DELETE",
					headers:{
						"Content-Type":"application/json"
                    },
                    body: JSON.stringify({})
	
                });
                const resultNoGame = await responseNoGame.json();

                document.getElementById("box-" + v.id).remove()
            })
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
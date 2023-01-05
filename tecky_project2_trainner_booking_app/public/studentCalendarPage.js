let eventInFullCalendarFormat = async function showEventOnCalendar(){
    let events = []
    
    const response = await fetch(`/jointEvent`);
    const result = await response.json();
    for(let a of result){
        let eventObj = {
            title: '',
            start: '',
            end: ''};
        eventObj.title = a.event_name;
        eventObj.start =  a.date + "T" + a.start_time;
        eventObj.end = a.date + "T" + a.end_time;
        events.push(eventObj)
        
        //Console log
        // console.log("date:",a.date);
        // console.log("result:",result);
        // console.log("eventObj:",eventObj);
    }
    // console.log(events);
    return events;

};


document.addEventListener('DOMContentLoaded', function () {

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        //to change language
          locale:'zh-tw',
        navLinks: true,
        //to change height of the calendar box
          height: 500,
          width: 300,
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        dateClick: async function (info) {
        

            // let data = await getDataFromServerByDate(info.dateStr)

            const eventDetails = document.getElementById('eventDetails');

            try {
                eventDetails.innerHTML = ``
                const response = await fetch(`/showCalendarJointEvent/${info.dateStr}`);
                const result = await response.json();

                // console.log(result);

                // console.log("ID:",result.id);
                 for (let v of result) {
                    console.log("ID:",v.id);
                    console.log("v:",v);

                    console.log("Result:",result);
                    eventDetails.innerHTML += `
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
                console.log("Error:", error);
            }


        },
        // },

        // 啟動拖曳調整日期
        //   editable: true,  
        events: eventInFullCalendarFormat,
        //Fullcalendar event format examples
        // [
        //     {
        //         title: 'Event1',
        //         start: '2022-11-20',
        //         end: '2022-11-20'
        //     },
        //     {
        //         title: 'Event2',
        //         start: '2022-11-22T14:00:00',
        //         end: '2022-11-22T15:00:00'
        //     },
        //     {
        //         title: 'Event3',
        //         start: '2022-11-22',
        //         allday: false
        //     },
        //     { // 事件(設定連結)
        //         title: "Click for Google",
        //         url: "http://google.com/",
        //         start: "2022-11-18"
        //     }
        // ]
    });
    calendar.render();
});

async function loadHeaderName() {
    let res = await fetch("/currentUser");
    let data = await res.json();
    let headerUsername = document.getElementById("headerUsername");
    headerUsername.textContent = `Welcome! ${data.username}`;
  }
  loadHeaderName();

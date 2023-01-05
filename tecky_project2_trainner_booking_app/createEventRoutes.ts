import express from "express";
// import path from 'path'
import { client } from "./env";
import { form, formObjectToArray, formParse } from "./formtableUtilis";
// import { requireLogin } from './guards';


// Create Event Action
export let createEventRoutes = express.Router();

export type Event = {
  eventName: string;
  mainEventType: string;
  subEventType: string;
  ageGroup: string;
  date: Date;
  startTime: number;
  endTime: number;
  area: string;
  district: string;
  fullAddress: string;
  classSize: number;
  caption: string;
  eventProfilePhoto?: string;
};

// export const dummyEvent: Event = {
//   eventName: "",
//   mainEventType: "",
//   subEventType: "",
//   ageGroup: "",
//   date: new Date(),
//   startTime: 1,
//   endTime: 1,
//   area: "",
//   district: "",
//   fullAddress: "",
//   classSize: 1,
//   caption: "",
//   eventProfilePhoto: "",
// };

//requireLogin
createEventRoutes.post("/event",async (req, res) => {
  // console.log(req.body);

  try {
    const { fields, files } = await formParse(form, req);
    const filesArray = formObjectToArray(files as any);

    console.log(fields);
    // console.log(filesArray[0].profile);
    
    
    // let userId = fields.userId;
    
    let trainerId = req.session.user!.id;
    
    let eventName = fields.eventName;
    // let mainEventType = req.body.mainEventType
    let subEventType = fields.subEventType;
    let ageGroup = fields.ageGroup;
    let date = fields.date;
    let startTime = fields.startTime;
    let endTime = fields.endTime;
    // let area = fields.area
    let district = fields.district;
    let fullAddress = fields.fullAddress;
    let classSize = fields.classSize;
    let caption = fields.caption;
    let eventProfilePhoto = filesArray[0].profile.newFilename;

    //to check 
    // for (let key in dummyEvent) {
    //   console.log(key);
    //   if (!req.body[key] || req.body[key] === "") {
    //     console.log(!req.body[key] );

    //     res.status(400).json({ message: `${key} should not be null` });
    //     return;
    //   }
    // }

    // console.log("classSize:",classSize);
    // console.log("type of classSize:",typeof classSize);
    // console.log("+classSize:",+classSize);
    // console.log("type of +classSize:",typeof +classSize);
    // console.log(Number.isNaN(+classSize));
    console.log("date:",date);
    console.log("type of date:",typeof date);
    // console.log("type of date:",toString(date) );
    const currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
  let today = `${year}-${month}-${day}`;
  // console.log("Today:", today);
  // console.log("Type of Today:", typeof today);
  // console.log("compare today < date",today < date);
  // console.log("compare date < today", date < today);
  console.log("endTime:", endTime);
  console.log("Type of endTime:", typeof endTime);
  console.log("compare startTime > endTime",startTime > endTime);
  // console.log("compare date < today", date < today);
  
  
    



    if(Number.isNaN(+classSize)){
      res.status(400).json({ message: "The input of class Size is not a number." });
      return;
    }
      else if( +classSize <= 0){
        res.status(400).json({ message: "It should not be smaller than 1." });
        return;
          }else if(date < today){
            res.status(400).json({ message: "Please create an event for today or a later date." });
          return;
            }else if(startTime > endTime){
              res.status(400).json({ message: "The end time should be later than the start time" });
            return;
            }
        
        else{
          await client.query(
          /* sql */ `insert into event (
                        trainer_id
                        ,event_name
                        ,sub_event_type_id
                        ,suggest_age_group_id
                        ,date
                        ,start_time
                        ,end_time
                        ,district_id
                        ,full_address
                        ,class_size
                        ,caption
                        ,event_profile_photo
                        )
                        VALUES
                        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
                        `,
          [
            trainerId,
            eventName,
            subEventType,
            ageGroup,
            date,
            startTime,
            endTime,
            district,
            fullAddress,
            +classSize,
            caption,
            eventProfilePhoto,
          ]
        );
    
    
        res.status(200).json({ message: "Event created" });
        return;


      }

    
  } catch (error) {
    console.log(error);

    res.status(500).json({ message: "Server error" });
    return;
  }
});
// try{

// let eventList = []

// for (let eventItem of eventList){
//     if (eventItem){

//     }
// }

// }

// res.json({message: 'ng ok'})
//   })



//For main event selection
export let selectMainEventRoutes = express.Router();



selectMainEventRoutes.get("/selectMainEvent", async (req,res)=> {
    let result = await client.query(/*sql*/ `select * from main_event_type`)
    res.json(result.rows)
    // console.log(result.rows);

})


//For sub event selection
export let selectSubEventRoutes = express.Router();
selectSubEventRoutes.get("/selectSubEvent", async (req,res)=> {
    let result = await client.query(/*sql*/ `select * from sub_event_type`)
    res.json(result.rows)

})

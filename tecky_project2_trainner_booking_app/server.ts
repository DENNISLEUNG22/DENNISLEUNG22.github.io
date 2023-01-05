import express from "express";
import { print } from "listening-on";
import path from "path";
import {
  createEventRoutes,
  selectMainEventRoutes,
  selectSubEventRoutes,
} from "./createEventRoutes";
import { showAllEvent,showCalendarAllEvent, deleteEvent } from "./showAllEventRoutes";
import { eventDetails, joinEvent } from "./confirmEventRoutes";

import { showJointEvent, showCalendarJointEvent} from "./showJointEvent";

import { sessionMiddleware } from "./session";
import { userRoutes } from "./userRoutes";
import { filterRouter } from "./filter";
import { classListRouter } from "./classList";
import { requireLogin } from "./guards";
import { paymentRoutes } from "./paymentRoutes";

// import jsonfile from "jsonfile";

let app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(sessionMiddleware);
app.use(userRoutes);
app.use(filterRouter);
app.use(classListRouter);
app.use(createEventRoutes);
app.use(selectMainEventRoutes);
app.use(selectSubEventRoutes);

app.use(showAllEvent);
app.use(showCalendarAllEvent);
app.use(deleteEvent);

app.use(eventDetails);
app.use(joinEvent);

app.use(showJointEvent);
app.use(paymentRoutes);
app.use(showCalendarJointEvent);



app.use(express.static("public"));
app.use(express.static("uploads"));
//test icon
app.use(express.static("jojoicon"));
app.use(requireLogin, express.static("private"));

// ----------404-page----------
app.use((req, res) => {
  res.status(404);
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

// ----------listening port----------
let port = 8080;
app.listen(port, () => {
  print(port);
});

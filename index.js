import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv";
import axios from "axios";



const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/bookinglist", (req, res) => {
  res.render("bookinglist.ejs");
});

app.get("/mybookings", (req, res) => {
  res.render("mybookings.ejs");
});

app.post('/submit', (req, res) => {
  const { attendees, date, timeSlots, phone, purpose } = req.body;

  // Process the data
  console.log('Attendees:', attendees);
  console.log('Date:', date);
  console.log('Time Slots:', timeSlots); // This will be an array
  console.log('Phone:', phone);
  console.log('Purpose:', purpose);

  // You can now handle the data, e.g., save it to a database or send a response
  res.send('Form submitted successfully');
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
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

app.post("/next", (req, res)=>{
     console.log(req.body);
});

function convertTo24HourFormat(time12h) {
  const [time, modifier] = time12h.split(' ');  // Split time and AM/PM
  let [hours, minutes] = time.split(':');     // Split hours and minutes

  // Convert hours to 24-hour format
  if (modifier === 'pm' && hours !== '12') {
    hours = (parseInt(hours) + 12).toString();
  }
  if (modifier === 'am' && hours === '12') {
    hours = '00';  // Midnight case
  }

  return `${hours}:${minutes}`;
}

app.post('/submit', (req, res) => {
  const { attendees, date, start, end, purpose } = req.body;

  // Step 1: Reformat the date from 'DD-MM-YYYY' to 'YYYY-MM-DD'
  const [day, month, year] = date.split('-');
  const formattedDate = `${year}-${month}-${day}`;  // Convert to 'YYYY-MM-DD'

  // Step 2: Convert start and end times from 12-hour to 24-hour format
  const startTime24 = convertTo24HourFormat(start);  // e.g., "02 pm" -> "14:00"
  const endTime24 = convertTo24HourFormat(end);      // e.g., "06 pm" -> "18:00"

  // Step 3: Convert start and end times to Date objects
  const startDate = new Date(`1970-01-01T${startTime24}:00Z`);
  const endDate = new Date(`1970-01-01T${endTime24}:00Z`);

  // Step 4: Create an empty array for timeslots
  const timeslots = [];

  // Step 5: Populate the timeslots array with one-hour intervals
  let currentSlot = new Date(startDate);

  while (currentSlot < endDate) {
    // Format the time slot into a string (e.g., "08:00", "09:00", etc.)
    const slotTime = currentSlot.toISOString().substring(11, 16);  // Extracts "HH:MM"
    timeslots.push(slotTime);

    // Increment the current time by one hour
    currentSlot.setHours(currentSlot.getHours() + 1);
  }

  // Log the data (optional)
  console.log('Attendees:', attendees);
  console.log('Formatted Date:', formattedDate);  // Date in 'YYYY-MM-DD' format
  console.log('Start:', start);
  console.log('End:', end);
  console.log('Purpose:', purpose);
  console.log('Generated Time Slots:', timeslots);

  // Now you can save `formattedDate` and `timeslots` to the database, etc.
  res.send({ message: 'Form submitted successfully', timeslots, formattedDate });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
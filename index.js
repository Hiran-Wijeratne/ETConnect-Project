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
env.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

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

app.post('/next', async (req, res) => {
  const { date } = req.body;  // selectedDate from frontend

  // Reformat date to YYYY-MM-DD format
  const [day, month, year] = date.split('-');
  const formattedDate = `${year}-${month}-${day}`;

  try {
      // Step 1: Query the bookings table to get booking_ids and their respective end_times for the selected date
      const bookingsResult = await pool.query(
          `SELECT booking_id, end_time FROM bookings WHERE date = $1`,
          [formattedDate]
      );

      // If no bookings found, send an empty response
      if (bookingsResult.rows.length === 0) {
          return res.json({ timeslots: [], end_times: [] });
      }

      // Step 2: Extract booking_ids from the result
      const bookingIds = bookingsResult.rows.map(row => row.booking_id);

      // Step 3: Query the timeslots table for all timeslots related to those booking_ids
      const timeslotsResult = await pool.query(
          `SELECT timeslot, booking_id FROM timeslots WHERE booking_id = ANY($1)`,
          [bookingIds]
      );

      // Step 4: Extract timeslots and end_times
      const timeslots = timeslotsResult.rows.map(row => row.timeslot);
      const endTimes = bookingsResult.rows.map(row => row.end_time);  // Get end_times from the bookings table

      // Step 5: Send the timeslot and end_time data to the frontend
      res.json({ timeslots, end_times: endTimes });
  } catch (error) {
      console.error('Error fetching timeslots and end_times:', error);
      res.status(500).send('Error fetching timeslots and end_times');
  }
});



// Convert 12-hour time to 24-hour format
function convertTo24HourFormat(time12h) {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');

  if (modifier.toLowerCase() === 'pm' && hours !== '12') {
    hours = (parseInt(hours) + 12).toString();
  }
  if (modifier.toLowerCase() === 'am' && hours === '12') {
    hours = '00';
  }

  return `${hours}:${minutes}`;
}

// Submit route to process and store booking data
app.post('/submit', async (req, res) => {
  const { attendees, date, start, end, purpose } = req.body;

  // Reformat date and convert times to 24-hour format
  const [day, month, year] = date.split('-');
  const formattedDate = `${year}-${month}-${day}`;
  const startTime24 = convertTo24HourFormat(start);
  const endTime24 = convertTo24HourFormat(end);

  try {
    // Step 1: Insert booking details into the bookings table
    const bookingResult = await pool.query(
      `INSERT INTO bookings (user_id, date, start_time, end_time, description, attendees, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING booking_id`,
      [1, formattedDate, startTime24, endTime24, purpose, attendees] // Assume user_id = 1 for this example
    );
    const bookingId = bookingResult.rows[0].booking_id;

    // Step 2: Generate timeslots and insert them into the timeslots table
    const timeslots = [];
    let currentSlot = new Date(`1970-01-01T${startTime24}:00Z`);
    const endSlot = new Date(`1970-01-01T${endTime24}:00Z`);

    while (currentSlot < endSlot) {
      const slotTime = currentSlot.toISOString().substring(11, 16); // "HH:MM" format
      timeslots.push(slotTime);

      // Insert each timeslot into the timeslots table
      await pool.query(
        `INSERT INTO timeslots (booking_id, timeslot)
         VALUES ($1, $2)`,
        [bookingId, slotTime]
      );

      currentSlot.setHours(currentSlot.getHours() + 1); // Move to the next hour
    }

    res.send({ message: 'Form submitted successfully', timeslots, formattedDate });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).send('Error saving booking');
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
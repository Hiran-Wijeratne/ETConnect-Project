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
      `SELECT booking_id, start_time, end_time FROM bookings WHERE date = $1`,
      [formattedDate]
    );

    // If no bookings found, send an empty response
    if (bookingsResult.rows.length === 0) {
      return res.json({ timeslots: [], end_times: [], start_times: [] });
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
    const startTimes = bookingsResult.rows.map(row => row.start_time);
    

    // Step 5: Send the timeslot and end_time data to the frontend
    res.json({ timeslots, end_times: endTimes, start_times: startTimes, booking_ids:bookingIds });
  } catch (error) {
    console.error('Error fetching timeslots and end_times:', error);
    res.status(500).send('Error fetching timeslots and end_times');
  }
});


// Submit route to process and store booking data
app.post('/submit', async (req, res) => {
  let { attendees, date, start, end, purpose } = req.body;
  // Set default values if attendees or purpose are not provided
  attendees = attendees || 2;
  purpose = purpose || 'Not Stated';

  // Reformat date and convert times to 24-hour format
  const [day, month, year] = date.split('-');
  const formattedDate = `${year}-${month}-${day}`;

  try {
    // Step 1: Insert booking details into the bookings table
    const bookingResult = await pool.query(
      `INSERT INTO bookings (user_id, date, start_time, end_time, description, attendees, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING booking_id`,
      [1, formattedDate, start, end, purpose, attendees] // Assume user_id = 1 for this example
    );
    const bookingId = bookingResult.rows[0].booking_id;

    // Step 2: Generate timeslots and insert them into the timeslots table
    const timeslots = [];

    // Ensure start and end are Date objects
    let startTime = new Date(`1970-01-01T${start}`); // Convert to Date object
    let endTime = new Date(`1970-01-01T${end}`);     // Convert to Date object

    while (startTime < endTime) {
      // Format the current time into "HH:mm"
      const slotTime = startTime.toTimeString().substring(0, 5);
      timeslots.push(slotTime);

      // Insert each timeslot into the timeslots table
      await pool.query(
        `INSERT INTO timeslots (booking_id, timeslot)
     VALUES ($1, $2)`,
        [bookingId, slotTime]
      );

      // Increment the start time by 1 hour
      startTime.setHours(startTime.getHours() + 1);
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
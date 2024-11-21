import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv";
import axios from "axios";
import moment from "moment";
import flash from "connect-flash";
import GoogleStrategy from "passport-google-oauth2";


const app = express();
const port = 3000;
const saltRounds = 10;
env.config();



app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Helper function to format dates
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};



app.use(async (req, res, next) => {
  try {
    const today = new Date();
    const thirtyDaysLater = new Date(today);
    thirtyDaysLater.setDate(today.getDate() + 30);

    // Query to get all bookings in the next 30 days
    const bookingsResult = await pool.query(
      `SELECT booking_id, date
       FROM bookings
       WHERE date >= $1 AND date <= $2`,
      [today, thirtyDaysLater]
    );

    const upcomingBookings = bookingsResult.rows;

    // Initialize an object to track time slots for each day
    const timeSlotsCount = {};

    // Loop through the bookings and get the time slots for each booking
    for (const booking of upcomingBookings) {
      const bookingId = booking.booking_id;
      const bookingDate = booking.date;

      // Query to get time slots for this booking
      const timeSlotsResult = await pool.query(
        `SELECT timeslot FROM timeslots
         WHERE booking_id = $1`,
        [bookingId]
      );

      // Count time slots for this booking and day
      const timeSlotsForThisBooking = timeSlotsResult.rows.length;
      const formattedDate = formatDate(new Date(bookingDate));

      if (!timeSlotsCount[formattedDate]) {
        timeSlotsCount[formattedDate] = 0;
      }

      timeSlotsCount[formattedDate] += timeSlotsForThisBooking;
    }

    // Filter days with more than 10 time slots
    const datesWithTooManyTimeSlots = [];
    for (const date in timeSlotsCount) {
      if (timeSlotsCount[date] > 9) {
        datesWithTooManyTimeSlots.push(date);
      }
    }

    // Make data available to all templates
    res.locals.datesWithTooManyTimeSlots = datesWithTooManyTimeSlots;
    res.locals.user = req.isAuthenticated() ? req.user : null;

    next();
  } catch (err) {
    console.error('Error fetching data:', err);
    next(err); // Pass the error to the next middleware
  }
});


app.get("/", async (req, res) => {
  res.render("index.ejs", { messages: req.flash('error') });
});


app.get("/login", (req, res) => {
  res.render("login.ejs", { messages: req.flash('error')});
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get("/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await pool.query("SELECT * FROM users WHERE username = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.render("register.ejs", { errorMessage: "Email already exists. Try logging in." });
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2)",
            [email, hash]
          );
          res.render("login.ejs");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", passport.authenticate("local", {
  successRedirect: '/',  // Redirect to the landing page on success
  failureRedirect: '/login',  // Redirect to login page on failure
  failureFlash: true  // Enable flash messages on failure
})
);

passport.use("local",
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await pool.query("SELECT * FROM users WHERE username = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              //Passed password check
              return cb(null, user);
            } else {
              //Did not pass password check
              return cb(null, false, { message: 'Incorrect username or password.' });
            }
          }
        });
      } else {
        return cb(null, false, { message: 'user not found, please sign in first.' });
      }
    } catch (err) {
      console.log(err);
      return cb(err);
    }
  })
);

passport.use("google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        console.log(profile);
        const email = profile.emails[0].value;
        const result = await pool.query("SELECT * FROM users WHERE username = $1", [
          email,
        ]);
        if (result.rows.length === 0) {
          const newUser = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2)",
            [email, "google"]
          );
          return cb(null, newUser.rows[0]);
        } else {
          return cb(null, result.rows[0]);
        }
      } catch (err) {
        return cb(err);
      }
    }
  )
);

app.get("/bookinglist", async (req, res) => {
  const currentDate = moment().format("YYYY-MM-DD");
  const currentTime = moment().format("HH:mm:ss");
  const pastLimitDate = moment().subtract(30, "days").format("YYYY-MM-DD"); // Date 30 days ago

  const upcomingQuery = `
    SELECT 
      b.booking_id, 
      u.username, 
      b.date, 
      b.start_time, 
      b.end_time, 
      b.description, 
      b.attendees, 
      DATE(b.created_at) AS booking_date
    FROM bookings b
    JOIN users u ON b.user_id = u.user_id
    WHERE 
      (b.date > $1) OR 
      (b.date = $1 AND b.end_time > $2)
    ORDER BY b.date, b.start_time
  `;

  const pastQuery = `
    SELECT 
      b.booking_id, 
      u.username, 
      b.date, 
      b.start_time, 
      b.end_time, 
      b.description, 
      b.attendees, 
      DATE(b.created_at) AS booking_date
    FROM bookings b
    JOIN users u ON b.user_id = u.user_id
    WHERE 
      (
        (b.date < $1 AND b.date >= $3) OR 
        (b.date = $1 AND b.end_time <= $2)
      )
    ORDER BY b.date DESC, b.start_time DESC
  `;

  try {
    const upcomingResult = await pool.query(upcomingQuery, [currentDate, currentTime]);
    const pastResult = await pool.query(pastQuery, [currentDate, currentTime, pastLimitDate]);

    const formatBookings = (rows) =>
      rows.map(row => ({
        booking_id: row.booking_id,
        username: row.username,
        date: moment(row.date).format("DD-MM-YYYY"),
        start_time: row.start_time,
        end_time: row.end_time,
        description: row.description,
        attendees: row.attendees,
        booking_date: moment(row.booking_date).format("DD-MM-YYYY"),
      }));

    const upcomingBookings = formatBookings(upcomingResult.rows);
    const pastBookings = formatBookings(pastResult.rows);

    res.render("bookinglist.ejs", { upcomingBookings, pastBookings });
  } catch (err) {
    console.error("Error retrieving bookings:", err);
    res.status(500).send("Error retrieving bookings.");
  }
});


app.get("/mybookings", async (req, res) => {
  if (req.isAuthenticated()) {
    const currentDate = moment().format("YYYY-MM-DD");
    const currentTime = moment().format("HH:mm:ss");

    // Retrieve the user_id of the currently logged-in user
    const userId = req.user.user_id;

    const upcomingQuery = `
      SELECT 
        b.booking_id, 
        u.username, 
        b.date, 
        b.start_time, 
        b.end_time, 
        b.description, 
        b.attendees, 
        DATE(b.created_at) AS booking_date
      FROM bookings b
      JOIN users u ON b.user_id = u.user_id
      WHERE 
        b.user_id = $1 AND
        b.date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '90 DAYS'
      ORDER BY b.date, b.start_time
    `;

    const pastQuery = `
      SELECT 
        b.booking_id, 
        u.username, 
        b.date, 
        b.start_time, 
        b.end_time, 
        b.description, 
        b.attendees, 
        DATE(b.created_at) AS booking_date
      FROM bookings b
      JOIN users u ON b.user_id = u.user_id
      WHERE 
        b.user_id = $1 AND
        b.date BETWEEN CURRENT_DATE - INTERVAL '90 DAYS' AND CURRENT_DATE
      ORDER BY b.date DESC, b.start_time DESC
    `;

    try {
      const upcomingResult = await pool.query(upcomingQuery, [userId]);
      const pastResult = await pool.query(pastQuery, [userId]);

      const formatBookings = (rows) =>
        rows.map(row => ({
          booking_id: row.booking_id,
          username: row.username,
          date: moment(row.date).format("DD-MM-YYYY"),
          start_time: row.start_time,
          end_time: row.end_time,
          description: row.description,
          attendees: row.attendees,
          booking_date: moment(row.booking_date).format("DD-MM-YYYY"),
        }));

      const upcomingMyBookings = formatBookings(upcomingResult.rows);
      const pastMyBookings = formatBookings(pastResult.rows);

      res.render("mybookings.ejs", { upcomingMyBookings, pastMyBookings });
    } catch (err) {
      console.error("Error retrieving your bookings:", err);
      res.status(500).send("Error retrieving your bookings.");
    }
  } else {
    res.redirect("/login");
  }
});

app.get("/calendar-view", (req, res) => {
  res.render("calendar.ejs");
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
      res.json({ timeslots, end_times: endTimes, start_times: startTimes, booking_ids: bookingIds });
    } catch (error) {
      console.error('Error fetching timeslots and end_times:', error);
      res.status(500).send('Error fetching timeslots and end_times');
    }
});


// Submit route to process and store booking data
app.post('/submit', async (req, res) => {
  if (req.isAuthenticated()) {
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
      [req.user.user_id, formattedDate, start, end, purpose, attendees] // Assume user_id = 1 for this example
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

    // res.send({ message: 'Form submitted successfully', timeslots, formattedDate });
    // res.redirect('/');
    res.render('confirmation.ejs', {
      booking: {
        id: bookingId,
        date: `${day}-${month}-${year}`, // Reformat for display
        startTime: start,
        endTime: end,
        attendees,
        purpose,
      },
    });
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).send('Error saving booking');
  }
} else {
  res.redirect("/login");
}
});

app.get("/confirmation", async (req, res) => {
  res.render("confirmation.ejs");
});

passport.serializeUser((user, cb) => {
  cb(null, user.user_id); // Serialize user_id to session
});

passport.deserializeUser(async (id, cb) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
    if (result.rows.length > 0) {
      cb(null, result.rows[0]); // Attach the full user object to req.user
    } else {
      cb(new Error('User not found'));
    }
  } catch (err) {
    cb(err);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
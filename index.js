import express from "express";
import wrapperroute from "./routes/WrapperRoutes.js";
import dotenv from "dotenv";
import cors from "cors"
// import express from "express";
import { google } from "googleapis";
import open from "open";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from './routes/auth.js'

//connect DB Local

// mongoose
//   .connect('mongodb://127.0.0.1:27017/JWT', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log(err));

// connect Server
  mongoose
  .connect('mongodb+srv://LIT-Admin:xeZlZKjwImeW4HaH@onboarding-data.akudtdl.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors())

app.use("/wrapper", wrapperroute);
app.use("/auth", router);
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// });

// const app = express();
app.use(bodyParser.json());

const SCOPES = ['https://www.googleapis.com/auth/userinfo.profile'];

const oauth2Client = new google.auth.OAuth2(
  "17669691891-vcj31pqltgtctv4g21djpafh30s0onbb.apps.googleusercontent.com",
  "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",
  "http://localhost:8000/callback"
);

app.get('/login', (req, res) => {
console.log("hello1")
  const url = oauth2Client.generateAuthUrl({
    access_type: 'online',
    scope: SCOPES,
  });

  open(url); // Opens the URL in the default browser

  res.send('Check your console for the login URL');
});

app.get('/callback', async (req, res) => {
console.log("hello1")
  const code = req.query.code;

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const userInfo = await google.oauth2('v2').userinfo.get({ auth: oauth2Client });

  res.send(`Logged in as: ${userInfo.data.name} (${userInfo.data.email})`);
});


const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import axios from "axios";
import express from "express";
import Email from "email-templates"
import open from "open";
import bodyParser from "body-parser";
import Lead from "../models/Lead.js";
import Calltracking from "../models/CallTracking.js";
import Reviewcount from "../models/Reviewcount.js";
import ReviewSchema from "../models/ReviewSchema.js";
import Dentalpractise from "../models/DentalPractise.js";
import Organicform from "../models/organicForm.js";
import channelbottom from "../models/ChannelBottom.js";
import Organics from "../models/Organic.js";
import Verifiedlead from "../models/VerifiedNewLeads.js";
import Seopurpose from "../models/Seopurpose.js";
import Chesswebsite from "../models/SeoWebsites.js";
import Businesslist from "../models/BusinessListing.js";
import Businessinfo from "../models/BusinessInfo.js";
import RepurationManagement from "../models/Repurationmanagement.js"
import RepurationReview from "../models/ReputationReview.js";
import Reviewform from "../models/Reviewform.js";
import Reviewurl from "../models/Reviewurl.js";
import { MongoClient, ObjectId } from 'mongodb';
import { google } from 'googleapis';
import { createTransport } from 'nodemailer';
import Sendemail from "../models/Sendemail.js";
import crypto from 'crypto'
import moment from 'moment';
import mongoose from "mongoose";
import User from "../models/User.js";
// const { getDB } = require('./db');
// const crypto = require('crypto');

//db connection
const uri = 'mongodb+srv://LIT-Admin:xeZlZKjwImeW4HaH@onboarding-data.akudtdl.mongodb.net/';
const dbName = 'Qualiconvert';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
await client.connect();
const db = client.db(dbName);

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  "27300239856-g2e2fl487n1ojjhlqb3d8jvtgtakcsov.apps.googleusercontent.com",
  "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",
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: "1//0488iLMO1Ba6KCgYIARAAGAQSNwF-L9Irm4ClOZYL94MLyR1KdRGobxvE0kDCr8kML843A7Gmc-H2Z8umWw4TQhvYmT5qi1ZBEj8",
});

const transporter = createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'audiologyplustech@gmail.com',
    clientId: '27300239856-g2e2fl487n1ojjhlqb3d8jvtgtakcsov.apps.googleusercontent.com',
    clientSecret: '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',
    refreshToken: '1//0488iLMO1Ba6KCgYIARAAGAQSNwF-L9Irm4ClOZYL94MLyR1KdRGobxvE0kDCr8kML843A7Gmc-H2Z8umWw4TQhvYmT5qi1ZBEj8',
  },
});

async function refreshAccessToken() {
  try {
    const { token } = await oauth2Client.getAccessToken();
    transporter.set('oauth2_provision_cb', (user, renewToken, callback) => {
      callback(null, token);
    });
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
}

refreshAccessToken();

const api_key = process.env.APIKEY;

export const Login = async (req, res) => {
  const { username, psw } = req.body;
  try {
    const collectionName = 'user';
    const collection = db.collection(collectionName);

    const decodedPassword = Buffer.from(psw, 'base64').toString('ascii');
    // console.log(decodedPassword)
    const inputMD5Hash = crypto.createHash('md5').update(decodedPassword).digest('hex');
     console.log("7cf532a1e6ecd591f9ef19bbb62767ab",inputMD5Hash,decodedPassword)

    let user = await collection.findOne({ userEmail: username, password: inputMD5Hash });
    if (user) {


      if (user.userName == "chesshouse") {
        user.locations = ["Chess House Dental Practice", "Harrow Weald Dental Practice"]
        user.email = user.userEmail
        user.uid = user.userId
        let data = {};
        data.campaign_id = user.campaign_id
        data.display_email = user.userEmail
        data.display_username = user.firstName
        data.email = user.userEmail
        data.location_id = user.location_id
        data.locations = ["Chess House Dental Practice", "Harrow Weald Dental Practice"]
        data.logo_path = user.logo_path
        data.phone = user.phone
        data.report_id = user.report_id
        data.role = user.role
        data.top_name = user.top_name
        data.uid = user.userId
        data.seo_insights = user.seo_insights
        return res.json({ status: 'success', 'user': user, 'data': data });
      }
      else if (user.userName == "harrowweald") {
        user.locations = ["Harrow Weald Dental Practice"]
        user.email = user.userEmail
        user.uid = user.userId
        let data = {};
        data.campaign_id = user.campaign_id
        data.display_email = user.userEmail
        data.display_username = user.firstName
        data.email = user.userEmail
        data.location_id = user.location_id
        data.locations = ["Harrow Weald Dental Practice"]
        data.logo_path = user.logo_path
        data.phone = user.phone
        data.report_id = user.report_id
        data.role = user.role
        data.top_name = user.top_name
        data.uid = user.userId
        data.seo_insights = user.seo_insights
        return res.json({ status: 'success', 'user': user, 'data': data });
      }
      else if (user.userName == "bristol") {
        user.locations = ["Bristol Dental Specialists"]
        user.email = user.userEmail
        user.uid = user.userId
        let data = {};
        data.campaign_id = user.campaign_id
        data.display_email = user.userEmail
        data.display_username = user.firstName
        data.email = user.userEmail
        data.location_id = user.location_id
        data.locations = ["Bristol Dental Specialists"]
        data.logo_path = user.logo_path
        data.phone = user.phone
        data.report_id = user.report_id
        data.role = user.role
        data.top_name = user.top_name
        data.uid = user.userId
        data.seo_insights = user.seo_insights
        return res.json({ status: 'success', 'user': user, 'data': data });
      }
      else{
        user.locations = []
        user.email = user.userEmail
        user.uid = user.userId
        let data = {};
        data.campaign_id = user.campaign_id
        data.display_email = user.userEmail
        data.display_username = user.firstName
        data.email = user.userEmail
        data.location_id = user.location_id
        data.locations = []
        data.logo_path = user.logo_path
        data.phone = user.phone
        data.report_id = user.report_id
        data.role = user.role
        data.top_name = user.top_name
        data.uid = user.userId
        data.seo_insights = user.seo_insights
        return res.json({ status: 'success', 'user': user, 'data': data });
      }

    }
    else {
      return res.json({ status: "mismatch data" })
    }
  } catch (error) {

  }
}

export const Resetpassword = async (req, res) => {
  const { email, newpassword } = req.query;
  try {
   console.log(email)
    const collectionName = 'user';
    const collection = db.collection(collectionName);
    const inputMD5Hash = crypto.createHash('md5').update(newpassword).digest('hex');
    let user = await collection.updateOne({ "userEmail": email }, { $set: { "password": inputMD5Hash ,"status":1} });

    if (user.matchedCount == 1) {
      return res.json({ status: "success" })
    } else {
      return res.json({ status: "Not updated" })
    }

  } catch (error) {

  }
}

export const Newuserfindone = async (req, res) => {
  const { useremail } = req.query;
  const collectionName = 'user';
  const collection = db.collection(collectionName);
  let user = await collection.findOne({ "userEmail": useremail });
  if (user) {
    res.json({ status: "success", message: "Existing User" })
  }
  else {
    res.json({ status: "success", message: "New User" })
  }
}


export const Newuserpasswordupdate = async (req, res) => {

  try {
    const { useremail, password } = req.body;
    const inputMD5Hash = crypto.createHash('md5').update(password).digest('hex');

    const collectionName = 'user';
    const collection = db.collection(collectionName);
    let user = await collection.findOne({ "userEmail": useremail });
    if (user) {
      res.json({ status: "success", message: "Existing User" })
    }
    else {
      const data = {
        campaign_id: 0,
        display_email: useremail,
        display_username: 0,
        email: useremail,
        location_id: 0,
        locations: [],
        logo_path: 0,
        phone: 0,
        report_id: 0,
        role: 0,
        top_name: 0,
        uid: 0,
        seo_insights: 0,
    
      }


      user ={
        userId: 0,
        userEmail: useremail,
        userName: '',
        password: inputMD5Hash,
        hash: '',
        firstName: '',
        status: '',
        utype: null,
        flink: null,
        tlink: null,
        ylink: null,
        ubgimage: null,
        shoppro_status: null,
        shopnow_status: null,
        ppc_status: null,
        role: 0,
        enc_password: null,
        otp: null,
        campaign_id: 0,
        top_name: '',
        report_id: 0,
        location_id: 0,
        logo_path: '',
        last_order: 0
      };

      // Save the user to the database
     let result= await collection.insertOne(user);
     console.log(result)
      res.json({ status: "success", message: "New User","user":user,"data":data })
    }

  } catch (error) {
    console.error('Error saving user:', error);
    return res.status(500).json({ status: 'error', message: 'Error saving user' });
  }

}

export const Forgotpassword = async (req, res) => {

  const { email } = req.body;
  try {
const generatePassword = (
  length = 20,
  characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
) =>
  Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map((x) => characters[x % characters.length])
    .join('')
    const collectionName = 'user';
    const collection = db.collection(collectionName);
    let forgetval=generatePassword();
    const inputMD5Hash = crypto.createHash('md5').update(forgetval).digest('hex');
    let user = await collection.updateOne({ userEmail: email }, { $set: { password: inputMD5Hash,status:0 } });
    let subject = "Login Details"
    let text = `<div style="width: 600px; margin: 0px auto; padding: 0px; border: 1px solid #6b7280;"> 
    <div style="display: block; clear: both; text-align: center; padding: 20px;">
      <p style="text-align: center; margin:16px 0px 32px 0px; font-size:16px; color:#25282b;">Your Account password is reset , Here are the details.</p>
      <p>Email : ${email}</p>
      <p>Password :${forgetval}</p>   
  </div> 
  </div>`;
 
    const mailOptions = {
      from: 'audiologyplustech@gmail.com',
      to: email !== "" ? email : email,
      subject,
      bcc: 'audiologyplustech@gmail.com',
      html: text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    if (user.matchedCount == 1) {
      return res.json({ status: "success", message: "Email sent successfully" })
    } else {
      return res.json({ status: "Not updated", message: "Not updated" })
    }

  } catch (error) {

  }
}

export const Semdmailreview = async (req, res) => {
  console.log(req.body.data.to_email)
  const { useremail } = req.query;
  const {to_email, mail_subject,user_email,location } = req.body.data;
  try {
    const multiEmails = req.body.data.to_email.split(',');
    const collectionName = 'user';
    const collection = db.collection(collectionName);
    let subject = mail_subject
    let text = `<div style="width: 600px; margin: 0px auto; padding: 0px; border: 1px solid #6B7280;">
    <div style="background: linear-gradient(270deg, #DD9CBF 0%, #8955EE 100%); text-align: center; padding: 15px 10px; display: block; clear: both;">
      <img style="width: 150px; height: auto; margin: 0 auto; background:#ffffff; padding:5px; border-radius:4px;" src="https://qualiconvertdcp.vercel.app/img/logo.png" alt="logo.png">
    </div>
    <div style="display: block; clear: both; text-align: center; padding: 20px;">
      <p style="text-align: center; margin:16px 0px 32px 0px; font-size:16px; color:#25282b;">Thank you for visiting our office, we truly hope you enjoyed your visit.</p>
      <p style="text-align: center; font-size:15px; color:#25282b;">Our goal is to provide the best service possible. In order to do that, we are asking that you help us improve our services by providing your feedback. Your input helps build our relationship with each other as well as improve the experience of future patients at our practice.</p>
      <h2 style="text-align: center; font-weight: 600; font-size: 16px; margin:32px 64px; color:#25282b;">Please leave us a review by clicking the stars below.</h2>
      <div style="text-align: center; padding: 0px 40px;">
          <a href="#!" target="_blank"> <img src="https://app.legaciestechno.com/dcp/img/stars_img.webp" alt="" style="width: 100%;"> </a>
      </div>
  </div>
    <div style="background:#000; color: #fff; line-height: 18px; text-align: center; padding: 15px 10px; display: block; clear: both; font-size:14px;">
        Copyright © 2024 Chess House Dental Practice..
    </div>
  </div>`;
    
    const mailOptions = {
      from: 'audiologyplustech@gmail.com',
      // to: to_email !== "" ? to_email : to_email,
      subject,
      cc: 'audiologyplustech@gmail.com',
      bcc: 'audiologyplustech@gmail.com',
      html: text,
    };

    multiEmails.forEach(async email => {
      mailOptions.to = email.trim();
     let sendmaildata=new Sendemail({
      email:to_email,
      adminemail:user_email,
      top_name:location,
      subject:mail_subject   
     });
     await sendmaildata.save();
     await transporter.sendMail(mailOptions);
     res.send({message:'success'})
    console.log('Email sent successfully');
    
    })

  } catch (error) {

  }
}


export const OrganicForm = async (req, res) => {
  try {
    const user_email = req.query.user_email; // assuming user_email is passed as a query parameter
    const search = req.query.search; // assuming search is passed as a query parameter
    const order = req.query.order;
    const user_id = req.query.user_id;
    const collectioncontactformName = 'contact_form';
    const collectioncontactform = db.collection(collectioncontactformName);
    // const { user_email, usr_id, filter_count, channel_filter } = req.query;

    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Get the first day of the next month
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    // Aggregate query to get counts for different contact types
    const aggregationPipeline = [
      { $match: { $or: [{ user_email: user_email }, { email: user_email }] } },
      { $match: { contact_type: { $ne: 'online-hearing-test-failed' } } },
      {
        $match:
        {
          created_date: {
            $gt: firstDayOfMonth.toISOString().slice(0, 10) + ' 00:00:00', // First day of the current month
            $lt: nextMonth.toISOString().slice(0, 10) + ' 00:00:00' // First day of the next month
          }
        }
      },
      {
        $group: {
          _id: '$contact_type',
          count: { $sum: 1 }
        }
      }
    ];

    const aggregationResults = await collectioncontactform.aggregate(aggregationPipeline).toArray();

    // Fetch distinct contact records
    const query = {
      $or: [{ user_email: user_email }, { email: user_email }],
      contact_type: { $ne: 'online-hearing-test-failed' },

    };

    const projection = {
      _id: 1,
      first_name: 1,
      email: 1,
      ph_number: 1,
      message: 1,
      contact_type: 1,
      created_date: 1,
      status: 1,
      sortorder: 1
    };

    const sort = { [order]: -1, created_date: -1 };

    const contactResults = await collectioncontactform.find(query).project(projection).sort(sort).toArray();

    let mobileCount = 0;
    let websiteCount = 0;

    // Process aggregation results
    aggregationResults.forEach(result => {
      if (result.contact_type === 'Amp') {
        result.contact_type = 'Website'
        mobileCount = result.count;
      } else if (result.contact_type === 'Website' || result.contact_type === '' || result.contact_type === ' ' || result.contact_type === 'contact_form') {
        result.contact_type = 'Website'
        websiteCount += result.count;
      }
      else {

      }
    });

    // Prepare response
    const response = {
      mobilecount: mobileCount,
      websitecount: websiteCount,
      // all_data_leads_filter_cf: contactResults
    };

    //calltracking

    // try {
    let organicscallsresponse;


    try {
      const today = new Date();
      // const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      // const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      // console.log(firstDayOfMonth.toISOString(),nextMonth.toISOString())


      const currentMonth = today.getMonth() + 1; // Month is zero-based, so add 1 to get the current month
const currentYear = today.getFullYear(); // Get current year

// Construct the start and end dates for the current month
const startOfMonth = new Date(`${currentMonth}-01-${currentYear}`);
const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Get the last day of the current month

// Convert start and end dates to your custom format "MM-DD-YY"
const startOfMonthFormatted = `${(startOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${startOfMonth.getDate().toString().padStart(2, '0')}-${currentYear.toString().slice(-2)}`;
const endOfMonthFormatted = `${(endOfMonth.getMonth() + 1).toString().padStart(2, '0')}-${endOfMonth.getDate().toString().padStart(2, '0')}-${currentYear.toString().slice(-2)}`;


//  console.log(startOfMonthFormatted,endOfMonthFormatted)
   
      const row_organics_calls = await db.collection('calltracking').find({
        $and: [
          { source_type: 'website' },
          { userId: parseInt(user_id) },
          { date: { $gt: startOfMonthFormatted, $lt: endOfMonthFormatted } }
        ]
      }).sort({ date: -1 }).toArray();

      let responsen1c = [];

      if (row_organics_calls.length > 0) {
        responsen1c = row_organics_calls.map(lead => ({
          id: lead.cid.toString(),
          tablename: 'calltracking',
          first_name: '--',
          email: '--',
          ph_number: lead.callfromnumber.toString(),
          message: lead.result,
          contact_type: 'Call Leads',
          date: lead.date.substring(0, 10), // Assuming date format is YYYY-MM-DD
          count: "1",
          reason: lead.result,
          status: lead.status
        }));

        responsen1c.sort((a, b) => new Date(b.date) - new Date(a.date));

        const totalOrganicChatbotCount = responsen1c.length;

        organicscallsresponse = {
          total_organic_calls: responsen1c,
          total_organic_calls_count: totalOrganicChatbotCount
        };
       
      } else {
        organicscallsresponse = {
          total_organic_calls: [],
          total_organic_calls_count: 0
        };
       
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }


    // } catch (error) {
    //     console.error("Error fetching data:", error);
    // }

    //chatbots
    let Chatbotresponse;
    let responsen2c = [];
    
    let totalOrganicChatbotCount;
    try {

      const row_chatboat_leads = await db.collection('chatboat_form').find({
        $and: [
          {
            $or: [{ user_email: user_email }, { email: user_email }]
          },
          {
            $or: [{ contact_type: 'Website' }, { contact_type: 'contact_form' }, { contact_type: '' }]
          },
          {
            contact_type: { $ne: 'online-hearing-test-failed' }
          },
          {
            created_date: {
              $gt: firstDayOfMonth.toISOString().slice(0, 10) + ' 00:00:00', // First day of the current month
              $lt: nextMonth.toISOString().slice(0, 10) + ' 00:00:00' // First day of the next month
            }
          }
        ]
      }).sort({ [order]: -1, created_date: -1 }).toArray();



      if (row_chatboat_leads.length > 0) {
        responsen2c = row_chatboat_leads.map(lead => ({
          id: lead.id,
          tablename: 'chatboat_form',
          first_name: lead.first_name,
          email: lead.email,
          ph_number: lead.ph_number,
          message: lead.message,
          sortorder: lead.sortorder,
          contact_type: lead.contact_type === 'Amp' ? 'chatboat' : (['Website', '', ' ', 'contact_form', ''].includes(lead.contact_type) ? 'chatboat' : lead.contact_type),
          date: new Date(lead.created_date).toISOString().slice(0, 10),
          count: "1",
          reason: lead.message,
          status: lead.status
        }));

        if (order === 'created_date') {
          responsen2c.sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        totalOrganicChatbotCount = responsen2c.length;
        

      } else {
        const response = {
          total_organic_chatbot: [],
          total_organic_chatbot_count: 0,
          total_chatboat: [],
          total_chatboat_count: 0
        };

        // console.log(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    Chatbotresponse = {
      mobilecount: response.mobilecount,
      websitecount: response.websitecount,
      total_organic_chatbot: responsen2c,
      total_organic_chatbot_count: totalOrganicChatbotCount,
      total_organic_calls: organicscallsresponse.total_organic_calls,
      total_organic_calls_count: organicscallsresponse.total_organic_calls_count,
      total_chatboat: responsen2c,
      total_chatboat_count: totalOrganicChatbotCount,
      total_forms: responsen2c,
      total_forms_count: totalOrganicChatbotCount
    };
  
    res.json(Chatbotresponse);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
}

let formattedStartDate;
let formattedEndDate;

export const ChannelBottom = async (req, res) => {
  try {
    const collectionCallTrackingName = 'calltracking';
    const collectionCallTracking = db.collection(collectionCallTrackingName);

    const collectionOrganicsFormName = 'contact_form';
    const collectionOrganicsForm = db.collection(collectionOrganicsFormName);

    const collectionChatbotsName = 'chatboat_form'; // Assuming this is a typo and should be 'chatbot_form'
    const collectionChatbots = db.collection(collectionChatbotsName);

    const collectionPaidFormsName = 'leads_google_data';
    const collectionPaidForms = db.collection(collectionPaidFormsName);

    const { user_email, channel_filter, user_id } = req.query;

    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - (parseInt(channel_filter) - 1), 1); // Calculate start date for the last 'channel_filter' months
    const endDate = currentDate;

    formattedStartDate= formatDate(startDate);
     formattedEndDate = formatDate(endDate);

    function formatDate(date) {
      const year = date.getFullYear();
      const month = padZero(date.getMonth() + 1);
      const day = padZero(date.getDate());
      return `${month}-${day}-${year}T00:00:00Z`; // Use ISO 8601 format
    }

    function padZero(num) {
      return num.toString().padStart(2, '0');
    }

    const channelMonths = [];
    const channelData = [];

    for (let i = 0; i < parseInt(channel_filter); i++) {
      const month = currentDate.getMonth() - i;
      const year = currentDate.getFullYear() - Math.floor((currentDate.getMonth() - i) / 12);
      const monthName = new Date(year, month, 1).toLocaleString('default', { month: 'long' });
      channelMonths.push(monthName);
    }

    channelMonths.reverse();

    for (const monthName of channelMonths) {
      const organicForms = await getChannelData(collectionOrganicsForm, user_email, monthName);
      const chatbot = await getChannelData(collectionChatbots, user_email, monthName);
      const organicCalls = await getChannelData(collectionCallTracking, user_email, monthName, 'Organic');
      const paidForms = await getChannelData(collectionPaidForms, user_email, monthName);
      const paidCalls = await getChannelData(collectionCallTracking, user_email, monthName, 'Paid');

      channelData.push({
        'Organic Forms': organicForms,
        'Chatbot': chatbot,
        'Organic Calls': organicCalls,
        'Paid Forms': paidForms,
        'Paid Calls': paidCalls
      });
    }

    res.send({ 
      channel_data: channelData, 
      channel_months: channelMonths 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getChannelData(collection, userEmail, monthName, channelName = null) {
  const matchStage = {
    $match: {
      user_email: userEmail,
      created_date: {
        $gte: formattedStartDate,
        $lt: formattedEndDate
      }
    }
  };

  if (channelName) {
    matchStage.$match.channel_name = channelName;
  }

  const groupStage = {
    $group: {
      _id: '$channel_name',
      count: { $sum: 1 }
    }
  };

  const projectStage = {
    $project: {
      _id: 0,
      month: monthName,
      channel_name: '$_id',
      count: '$count'
    }
  };

  const sortStage = {
    $sort: { channel_name: 1 }
  };

  const aggregationPipeline = [matchStage, groupStage, projectStage, sortStage];

  return await collection.aggregate(aggregationPipeline).toArray();
}




export const Dashboardstatus = async (req, res) => {

  // Connection to MongoDB

  const { user_email, rid, status_type, tname } = req.query;
  try {
    const user = await db.collection('user').findOne({ userEmail: user_email });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    let lastOrder = user.last_order + 1;

    let filter = {};
    if (tname === 'calltracking') {
      filter = { cid: parseInt(rid) };
    } else {
      filter = { id: parseInt(rid) };
    }

    let updateData = { $set: { status: status_type, sortorder: lastOrder } };
    const result = await db.collection(tname).updateOne(filter, updateData);
    console.log(updateData, filter)

    if (result.modifiedCount === 0) {
      return res.status(404).json({ status: 'error', message: 'Data not found' });
    }

    await db.collection('user').updateOne({ userId: user.userId }, { $set: { last_order: lastOrder } });

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }

}


export const Reputationreview = async (req, res) => {
  try {

    // Get the collection
    const reviewsCollection = db.collection('reviews');

    // Simulating request parameters
    const { start_date, end_date, source, rate_by, user_email } = req.query;

    const requestBody = '{"data":{"start_date":"2024-01-01","end_date":"2024-03-15","source":"All","rate_by":"All"}}';
    const data = JSON.parse(requestBody);
    let search = {};

    // Fetch counts
    let row_facebook_count = 0;
    let row_google_count = 0;
    let row_yelp_count = 0;

    // Fetch counts for each source
    if (start_date && end_date) {
      if (source === 'All') {
        row_facebook_count = await reviewsCollection.countDocuments({ email: user_email, review_type: 'Facebook', ...search });
        row_google_count = await reviewsCollection.countDocuments({ email: user_email, review_type: 'google', ...search });
        row_yelp_count = await reviewsCollection.countDocuments({ email: user_email, review_type: 'yelp', ...search });
      } else {
        row_facebook_count = await reviewsCollection.countDocuments({ email: user_email, review_type: 'Facebook', ...search });
        row_google_count = await reviewsCollection.countDocuments({ email: user_email, review_type: 'google', ...search });
        row_yelp_count = await reviewsCollection.countDocuments({ email: user_email, review_type: 'yelp', ...search });
      }
    } else {
      row_facebook_count = await reviewsCollection.countDocuments({ email: user_email, review_type: 'Facebook', ...search });
      row_google_count = await reviewsCollection.countDocuments({ email: user_email, review_type: 'google', ...search });
      row_yelp_count = await reviewsCollection.countDocuments({ email: user_email, review_type: 'yelp', ...search });
    }

    // Prepare response
    const response = {
      facebook_count: [
        { key: "Google", value: row_google_count },
        { key: "Facebook", value: row_facebook_count },
        { key: "Yelp", value: row_yelp_count }
      ]
    };

    // Fetch all data
    const row_leads = await reviewsCollection.find({ email: user_email, ...search }).toArray();

    // Prepare all_data_google
    const responsen_ap = row_leads.map(row => ({
      rating: row.review_rating,
      review: row.review_text,
      source: row.review_type,
      date: row.review_timestamp
    }));

    // Sort by date
    responsen_ap.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Add to response
    response.all_data_google = responsen_ap;

    // Send the response
    res.json(response);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }


}



export const ReviewForm = async (req, res) => {
  try {
    const { fname, lname, pnumber, email, message, adminemail, username } = req.body;

    let subject = "Rating status"
    let text = `<section style="width: auto; padding: 1.25rem; background-color: #F5F8FF;">
     <div style="max-width: 1280px; padding: 1rem 2rem; margin: 0 auto; display: flex; justify-content: center; align-items: center;">
    
       <div class=" ">
           <form> 
           <div style="width: 900px; border: 2px solid #E0E0E0; border-color: #E0E0E0; transition: border-color 0.5s; color: black; background-color: white; border-radius: 1rem; padding: 1.25rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); " onmouseover="this.style.borderColor='#ccc'" onmouseout="this.style.borderColor='#E0E0E0'">
   
               <section style=" color: #666; /* font-family: ; */ position: relative; padding-top: 0.75rem; padding-bottom: 0.75rem;">                                                         
                       
                       <div style="width: 100%; max-width: 50%; text-align:center; padding-top: 0.5rem; padding-bottom: 0.5rem; margin: 0 auto; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                           <h1 style="font-size: 1rem; color: black;">
                             <!-- Shedule an    -->
                             <span style="font-weight: 600; color:black; font-family: sans-serif; text-decoration: underline;">
                             Form Submission submitted from client
                             </span>
                           </h1>                         
                       </div>
   
                       <div style="display: flex; flex-wrap: wrap;">
                         <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                           <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                             <span style="font-weight: 600; color: black; font-family: sans-serif;">First name:</span>
                           </h3>
                         </div>                    
                         <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                           <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                             <span style="font-weight: 500; color: #4B5563; font-family: sans-serif;">${fname || ''}</span>
                           </h3>
                         </div>
                       </div> 
                       
                       
                       <div style="display: flex; flex-wrap: wrap;">
                       <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                         <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                           <span style="font-weight: 600; color: black; font-family: sans-serif;">Last Name:</span>
                         </h3>
                       </div>                    
                       <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                         <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                           <span style="font-weight: 500; color: #4B5563; font-family: sans-serif;">${lname || ''}</span>
                         </h3>
                       </div>
                     </div>
                       
                       <div style="display: flex; flex-wrap: wrap;">
                         <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                           <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                             <span style="font-weight: 600; color: black; font-family: sans-serif;">UserEmail:</span>
                           </h3>
                         </div>                    
                         <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                           <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                             <span style="font-weight: 500; color: #4B5563; font-family: sans-serif;">${email || ''}</span>
                           </h3>
                         </div>
                       </div>  

                   <div style="display: flex; flex-wrap: wrap;">
                   <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                     <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                       <span style="font-weight: 600; color: black; font-family: sans-serif;">Phone Number:</span>
                     </h3>
                   </div>                    
                   <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                     <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                       <span style="font-weight: 500; color: #4B5563; font-family: sans-serif;">${pnumber || ''}</span>
                     </h3>
                   </div>
                 </div>  

                 <div style="display: flex; flex-wrap: wrap;">
                 <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                   <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                     <span style="font-weight: 600; color: black; font-family: sans-serif;">Message:</span>
                   </h3>
                 </div>                    
                 <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                   <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                     <span style="font-weight: 500; color: #4B5563; font-family: sans-serif;">${message || ''}</span>
                   </h3>
                 </div>
               </div>  

                       </div>        
                 </section> 
                
   
           </div>
       </form>
   
         
       </div>
     </div>
   </section>`;
    console.log(adminemail)
    const mailOptions = {
      from: 'audiologyplustech@gmail.com',
      to: adminemail !== "" ? adminemail : adminemail,
      subject,
      cc: 'audiologyplustech@gmail.com',
      bcc: 'audiologyplustech@gmail.com',
      html: text,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');

    // Create a new user
    let user = new Reviewform({
      fname,
      lname,
      pnumber,
      email,
      message,
      adminemail
    });
    console.log(req.body, user)

    // Save the user to the database
    await user.save();
    // console.log('User saved successfully');

    // Send combined success response
    res.status(200).json({ msg: 'Email sent and user saved successfully' })
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export const ReviewURL = async (req, res) => {
  try {
    // Check for validation errors

    const { googlereview, facebookreview, othersreview, adminemail, googledisplay,
      facebookdisplay, username,
      othersdisplay } = req.body;
   console.log(adminemail)
      let user = await Reviewurl.findOne({ "adminemail":adminemail });
      if (user) {
        await Reviewurl.updateOne(
        { "adminemail": adminemail }, // Filter
        { $set: { googlereview, facebookreview,othersreview }} 
      );
      return res.json({ msg: 'successfully updated' });
    }
    // Create a new user
     user = new Reviewurl({
      googlereview,
      facebookreview,
      othersreview,
      adminemail, googledisplay,
      facebookdisplay,
      username,
      othersdisplay
    });
    console.log(req.body, user)

    // Save the user to the database
    await user.save();
    res.json({ msg: 'successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export const ReviewURLUpdate = async (req, res) => {
  try {
    // Check for validation errors

    const { googlereview, facebookreview, othersreview, adminemail, googledisplay,
      facebookdisplay, username,
      othersdisplay } = req.body;
     console.log(req.body)
    let user = await Reviewurl.findOne({ "adminemail": adminemail });
    if (user) {
      await Reviewurl.updateOne(
        { "adminemail": adminemail }, // Filter
        { $set: { username: username } }
      );
      // return res.json({ msg: 'successfully updated' });
    }
    // Create a new user
    // let user = new Reviewurl({
    //   googlereview,
    //   facebookreview,
    //   othersreview,
    //   adminemail,googledisplay,
    //   facebookdisplay,
    //   username,
    //   othersdisplay
    // });
    // console.log(req.body,user)

    // Save the user to the database
    // await user.save();
    res.json({ msg: 'successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export const ReviewURLfindone = async (req, res) => {

  try {
    // Find document with the provided email
    const { username } = req.query;
    let result = await Reviewurl.findOne({ adminemail: username });

    if (result) {
      res.send(result)
      // console.log('Found document:', result);
    } else {
      res.send(`No document found with the email:${adminemail}`)

    }
  } catch (err) {
    console.error('Error occurred:', err);
  }
  // const { user_email } = req.query;


  // let result = await Reviewurl.deleteMany({ adminemail: user_email });

  // if (result.deletedCount > 0) {
  //     res.send(`Deleted ${result.deletedCount} documents with email: ${user_email}`);
  // } else {
  //     res.send(`No documents found with email: ${user_email}`);
  // }
}



export const Semdmail = async (req, res) => {
  try {
    const { to, content, fileName, pdf, fname, lname, pnumber, message, email } = req.body;
    let subject = "Rating status"
    let text = `<section style="width: auto; padding: 1.25rem; background-color: #F5F8FF;">
      <div style="max-width: 1280px; padding: 1rem 2rem; margin: 0 auto; display: flex; justify-content: center; align-items: center;">
     
        <div class=" ">
            <form> 
            <div style="width: 900px; border: 2px solid #E0E0E0; border-color: #E0E0E0; transition: border-color 0.5s; color: black; background-color: white; border-radius: 1rem; padding: 1.25rem; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); " onmouseover="this.style.borderColor='#ccc'" onmouseout="this.style.borderColor='#E0E0E0'">
    
                <section style=" color: #666; /* font-family: ; */ position: relative; padding-top: 0.75rem; padding-bottom: 0.75rem;">                                                         
                        
                        <div style="width: 100%; max-width: 50%; text-align:center; padding-top: 0.5rem; padding-bottom: 0.5rem; margin: 0 auto; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                            <h1 style="font-size: 1rem; color: black;">
                              <!-- Shedule an    -->
                              <span style="font-weight: 600; color:black; font-family: sans-serif; text-decoration: underline;">
                              Form Submission submitted from client
                              </span>
                            </h1>                         
                        </div>
    
                        <div style="display: flex; flex-wrap: wrap;">
                          <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                            <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                              <span style="font-weight: 600; color: black; font-family: sans-serif;">First name:</span>
                            </h3>
                          </div>                    
                          <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                            <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                              <span style="font-weight: 500; color: #4B5563; font-family: sans-serif;">${fname || ''}</span>
                            </h3>
                          </div>
                        </div> 
                        
                        
                        <div style="display: flex; flex-wrap: wrap;">
                        <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                          <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                            <span style="font-weight: 600; color: black; font-family: sans-serif;">Last Name:</span>
                          </h3>
                        </div>                    
                        <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                          <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                            <span style="font-weight: 500; color: #4B5563; font-family: sans-serif;">${lname || ''}</span>
                          </h3>
                        </div>
                      </div>
                        
                        <div style="display: flex; flex-wrap: wrap;">
                          <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                            <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                              <span style="font-weight: 600; color: black; font-family: sans-serif;">UserEmail:</span>
                            </h3>
                          </div>                    
                          <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                            <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                              <span style="font-weight: 500; color: #4B5563; font-family: sans-serif;">${email || ''}</span>
                            </h3>
                          </div>
                        </div>  

                    <div style="display: flex; flex-wrap: wrap;">
                    <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                      <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                        <span style="font-weight: 600; color: black; font-family: sans-serif;">Phone Number:</span>
                      </h3>
                    </div>                    
                    <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                      <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                        <span style="font-weight: 500; color: #4B5563; font-family: sans-serif;">${pnumber || ''}</span>
                      </h3>
                    </div>
                  </div>  

                  <div style="display: flex; flex-wrap: wrap;">
                  <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                    <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                      <span style="font-weight: 600; color: black; font-family: sans-serif;">Message:</span>
                    </h3>
                  </div>                    
                  <div style="padding: 0.5rem; width: 100%; max-width: 33.333333%;">
                    <h3 style="margin-bottom: 0.5rem; display: flex; font-size: 0.9rem;">
                      <span style="font-weight: 500; color: #4B5563; font-family: sans-serif;">${message || ''}</span>
                    </h3>
                  </div>
                </div>  

                        </div>        
                  </section> 
                 
    
            </div>
        </form>
    
          
        </div>
      </div>
    </section>`;

    const mailOptions = {
      from: 'audiologyplustech@gmail.com',
      to: email,
      subject,
      cc: 'audiologyplustech@gmail.com',
      bcc: 'audiologyplustech@gmail.com',
      html: text,

    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
}

export const Viewalldashboard = async (req, res) => {
  const { user_email, user_id, filter_count } = req.query;

  try {
      // Connect to the MongoDB cluster
      await client.connect();
  
      const contactFormCollection = db.collection('contact_form');
      const chatbotFormCollection = db.collection('chatbot_form');
      const calltrackingCollection = db.collection('calltracking');
      const qapFormCollection = db.collection('qap_form');
  
      const startDate = new Date().toLocaleDateString('en-GB'); // Current date in dd-mm-yyyy format
      const endDate = new Date().toLocaleDateString('en-GB');
  
      const firstDayLastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1).toLocaleDateString('en-GB');
  
      let currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - filter_count);
      const lastDayLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toLocaleDateString('en-GB');
  
      const search = {
          userId: user_id,
          date: { $gte: startDate, $lte: endDate }
      };
  
      const searchLast = {
          userId: user_id,
          date: { $gte: firstDayLastMonth, $lte: lastDayLastMonth }
      };
  
      // Retrieve organic chat leads
      const row_organicChat = await chatbotFormCollection.aggregate([
          { $match: { userId: user_id, contact_type: { $ne: 'online-hearing-test-failed' }, count_val: { $exists: true }, ...search } },
          { $group: { _id: "$date", count: { $sum: "$count_val" } } }
      ]).toArray();
  
      const organic_chat_leads = row_organicChat.map(entry => ({
          date: entry._id,
          count: entry.count.toString() // Convert count to string as per your desired output format
      }));
  
      // Retrieve organic form leads
      const row_organicForms = await contactFormCollection.aggregate([
          { $match: { userId: user_id, contact_type: { $ne: 'online-hearing-test-failed' }, count_val: { $exists: true }, ...search } },
          { $group: { _id: "$date", count: { $sum: "$count_val" } } }
      ]).toArray();
  
      const organic_forms_leads = row_organicForms.map(entry => ({
          date: entry._id,
          count: entry.count.toString() // Convert count to string as per your desired output format
      }));
  
      // Retrieve organic calls leads
      const row_organicCalls = await calltrackingCollection.aggregate([
          { $match: { userId: user_id, source_type: "website", status: "enquiry", ...search } },
          { $group: { _id: "$date", count: { $sum: 1 } } }
      ]).toArray();
  
      const organic_calls_leads = row_organicCalls.map(entry => ({
          date: entry._id,
          count: entry.count.toString() // Convert count to string as per your desired output format
      }));
  
      // Retrieve paid form leads
      const row_paidForms = await qapFormCollection.aggregate([
          { $match: { userId: user_id, ...search } },
          { $group: { _id: "$date", count: { $sum: 1 } } }
      ]).toArray();
  
      const paid_form_leads = row_paidForms.map(entry => ({
          date: entry._id,
          count: entry.count.toString() // Convert count to string as per your desired output format
      }));
  
      // Other calculations...
  
      const output = {
          percentage_symbol: "%",
          organic_forms_leads: organic_forms_leads,
          organic_chat_leads: organic_chat_leads,
          organic_calls_leads: organic_calls_leads,
          organic_calls_percentage: 0,
          organic_chatbot_percentage: 0,
          organic_forms_percentage: 0,
          current_organic_forms_count: 0,
          current_organic_chatbot_count: 0,
          prev_organic_forms_count: 0,
          prev_organic_chatbot_count: 0,
          current_paid_forms_count: 0,
          current_organic_calls_count: 0,
          paid_forms_percentage: 0,
          paid_organic_calls_count: 0,
          prev_paid_calls_count: 0,
          prev_paid_forms_count: 0,
          prev_organic_calls_count: 0,
          paid_calls_leads: [],
          paid_calls_percentage: 0,
          paid_form_leads: paid_form_leads
      };
  
      res.json(output);
  
  } catch (e) {
      if (e instanceof RangeError && e.message === 'Invalid time value') {
          console.error('Error: Invalid time value. Please check date formatting.');
      } else {
          console.error(e);
      }
  }
  
  
};

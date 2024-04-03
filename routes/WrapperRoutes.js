import express from "express";
import { OrganicForm,ChannelBottom,Reputationreview,
 Dashboardstatus,ReviewForm,ReviewURL,Semdmail,ReviewURLUpdate,Login,Resetpassword,Forgotpassword,Semdmailreview,
 ReviewURLfindone,Newuserfindone,Newuserpasswordupdate,Viewalldashboard} from "../Controller/WrapperController.js";


const wrapperroute = express.Router();

//Wrapper for TextToImage


wrapperroute.get("/organicForm",OrganicForm)

wrapperroute.get("/channelBottom",ChannelBottom)


wrapperroute.get("/reputationreview",Reputationreview)


wrapperroute.get("/dashboardstatus",Dashboardstatus)


wrapperroute.post("/reviewForm",ReviewForm)

wrapperroute.post("/reviewURL",ReviewURL)

wrapperroute.get("/reviewURLfindone",ReviewURLfindone)

wrapperroute.post("/reviewURLUpdate",ReviewURLUpdate)

wrapperroute.post("/login",Login)

wrapperroute.get("/resetpassword",Resetpassword)

wrapperroute.post("/forgotpassword",Forgotpassword)

wrapperroute.post("/sendmail",Semdmail);

wrapperroute.post("/sendmailreview",Semdmailreview);

wrapperroute.get("/newuserfindone",Newuserfindone)

wrapperroute.post("/newuserpasswordupdate",Newuserpasswordupdate)

wrapperroute.get("/viewalldashboard",Viewalldashboard)


export default wrapperroute;

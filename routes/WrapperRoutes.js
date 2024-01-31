import express from "express";
import { TextToImage,ImageToImage,UtilityFunction,FindAllModel,FindOneModel,Controlnets,SearchModel,
ImageToImageDisplay,UtilityFunctionDisplay,ControlnetsDisplay,TextToImageDisplay } from "../Controller/WrapperController.js";


const wrapperroute = express.Router();

//Wrapper for TextToImage
wrapperroute.post("/textToImage", TextToImage);

wrapperroute.get("/findAllModel",FindAllModel)

wrapperroute.get("/findOneModel",FindOneModel)

wrapperroute.post("/imageToImage", ImageToImage);

wrapperroute.post("/utilityFunction", UtilityFunction);

wrapperroute.post("/controlnets",Controlnets)

wrapperroute.get("/searchModel",SearchModel)

wrapperroute.get("/imageToImagedisplay",ImageToImageDisplay)

wrapperroute.get("/textToImagedisplay", TextToImageDisplay);

wrapperroute.get("/utilityFunctiondisplay", UtilityFunctionDisplay);

wrapperroute.get("/controlnetsdisplay",ControlnetsDisplay)

export default wrapperroute;

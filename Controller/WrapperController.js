import axios from "axios";
import express from "express";
import { google } from "googleapis";
import open from "open";
import bodyParser from "body-parser";


const api_key=process.env.APIKEY;
// const fs = require('fs');
//   const path = require('path');

//Wrapper for TexttoImage

export const TextToImage = async (req, res) => {
  try {
   
     const api_key = "SG_cdb02db099cb8b32";
     const { name } = req.query;
    const url = `https://api.segmind.com/v1/${name}`;

    const data = req.body;
    try {
      const response = await axios.post(url, data, {
        headers: {
          "x-api-key": api_key,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer",
      });

      const imageBuffer = Buffer.from(response.data, "binary");

      res.writeHead(200, {
        "Content-Type": "image/jpeg",
        "Content-Length": imageBuffer.length,
      });

      res.end(imageBuffer);
    } catch (error) {
      console.error("Error calling the API:error", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.log(error);
  }
};


export const ImageToImage=async (req, res)=>{
  try{
  const api_key = "SG_cdb02db099cb8b32";
  const { name } = req.query;
  const data = req.body;
  const url = `https://api.segmind.com/v1/${name}`;
    try{
          const response = await axios.post(url, data, { headers: { 'x-api-key': api_key }, responseType: "arraybuffer" });
          const imageBuffer = Buffer.from(response.data, "binary");
          res.writeHead(200, {
              "Content-Type": "image/jpeg",
              "Content-Length": imageBuffer.length,
          });
  
          res.end(imageBuffer);
        } catch (error) {
          // console.error("Error calling the API:error", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
          
} catch (error) {
  console.log(error);
}

}


export const UtilityFunction=async(req,res)=>{
  try{
    const api_key = "SG_cdb02db099cb8b32";
    const { name } = req.query;
    const data = req.body;
  
    const url = `https://api.segmind.com/v1/${name}`;
      try{
            const response = await axios.post(url, data, { headers: { 'x-api-key': api_key }, responseType: "arraybuffer" });
            const imageBuffer = Buffer.from(response.data, "binary");
    
            res.writeHead(200, {
                "Content-Type": "image/jpeg",
                "Content-Length": imageBuffer.length,
            });
    
            res.end(imageBuffer);
          } catch (error) {
            console.error("Error calling the API:error", error);
            res.status(500).json({ error: "Internal Server Error" });
          }
            
  } catch (error) {
    console.log(error);
  }
}



export const FindAllModel=async(req,res)=>{
  
    const url = "https://www.segmind.com/_next/data/yJgtaEtIfBEDG2_1phHT1/models.json";
      try{
        axios.get(url, {
          headers: {
         
              'Content-Type': 'application/json'
          }
      })
          .then(response => {
            console.log(response.data.pageProps.models.length)
            res.send(response.data.pageProps)
          })
          .catch(error => {
            res.send(error)
  
          });
         
         
  } catch (error) {
    console.log(error);
  }
}


export const FindOneModel=async(req,res)=>{

  const { name } = req.query;
  const url = `https://www.segmind.com/_next/data/yJgtaEtIfBEDG2_1phHT1/models/${name}.json?route=${name}`;
    try{
      axios.get(url, {
        headers: {
       
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
          res.send(response.data.pageProps)
        })
        .catch(error => {
          res.send(error)

        });
       
       
} catch (error) {
  console.log(error);
}
}


export const Controlnets=async(req,res)=>{
  try{
    const api_key = "SG_cdb02db099cb8b32";
    const { name } = req.query;
    const data = req.body;
  
    const url = `https://api.segmind.com/v1/${name}`;
      try{
            const response = await axios.post(url, data, { headers: { 'x-api-key': api_key }, responseType: "arraybuffer" });
            const imageBuffer = Buffer.from(response.data, "binary");
    
            res.writeHead(200, {
                "Content-Type": "image/jpeg",
                "Content-Length": imageBuffer.length,
            });
    
            res.end(imageBuffer);
          } catch (error) {
            // console.error("Error calling the API:error", error)
            res.status(500).json({ error: "Internal Server Error" });
          }
            
  } catch (error) {
    console.log(error);
  }
}

export const SearchModel=async(req,res)=>{
 
  const {title}=req.query  
  const url = "https://www.segmind.com/_next/data/yJgtaEtIfBEDG2_1phHT1/models.json";
    try{
    axios.get(url, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
        let filtervalue=response.data.pageProps.models.filter(model => model.title.includes(title))
          res.send(filtervalue)
       
        })
        .catch(error => {
          res.send(error)

        });
      
       
} catch (error) {
  console.log(error);
}
}


export const TextToImageDisplay=async(req,res)=>{
  
  const url = "https://www.segmind.com/_next/data/yJgtaEtIfBEDG2_1phHT1/models.json";
    try{
      axios.get(url, {
        headers: {
       
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
          console.log(response.data.pageProps.models.length)
          res.send(response.data.pageProps.models.slice(0,40))
        })
        .catch(error => {
          res.send(error)

        });
       
       
} catch (error) {
  console.log(error);
}
}

export const ImageToImageDisplay=async(req,res)=>{
  
  const url = "https://www.segmind.com/_next/data/yJgtaEtIfBEDG2_1phHT1/models.json";
    try{
      axios.get(url, {
        headers: {
       
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
          console.log(response.data.pageProps.models.length)
          res.send(response.data.pageProps.models.slice(40,50))
        })
        .catch(error => {
          res.send(error)

        });
       
       
} catch (error) {
  console.log(error);
}
}

export const UtilityFunctionDisplay=async(req,res)=>{
  
  const url = "https://www.segmind.com/_next/data/yJgtaEtIfBEDG2_1phHT1/models.json";
    try{
      axios.get(url, {
        headers: {
       
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
          console.log(response.data.pageProps.models.length)
          res.send(response.data.pageProps.models.slice(50,59))
        })
        .catch(error => {
          res.send(error)

        });
       
       
} catch (error) {
  console.log(error);
}
}

export const ControlnetsDisplay=async(req,res)=>{
  
  const url = "https://www.segmind.com/_next/data/yJgtaEtIfBEDG2_1phHT1/models.json";
    try{
      axios.get(url, {
        headers: {
       
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
          let responsevalue=response.data.pageProps.models.length;
          console.log(response.data.pageProps.models.length)
          res.send(response.data.pageProps.models.slice(59,responsevalue))
        })
        .catch(error => {
          res.send(error)

        });
       
       
} catch (error) {
  console.log(error);
}
}
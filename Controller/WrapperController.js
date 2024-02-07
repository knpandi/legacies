import axios from "axios";
import express from "express";
import { google } from "googleapis";
import open from "open";



const api_key = process.env.APIKEY;
// const fs = require('fs');
//   const path = require('path');

//Wrapper for TexttoImage

export const TextToImage = async (req, res) => {
  try {
    const api_key = "SG_cdb02db099cb8b32";
    const { name } = req.query;
    const url = `https://api.segmind.com/v1/${name}`;
  
    const data = req.body;
  
    const response = await axios.post(url, data, {
      headers: {
        "x-api-key": api_key,
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
    });
    
    const imageBuffer = Buffer.from(response.data, 'binary');
  
    res.writeHead(200, {
      "Content-Type": "image/jpeg",
      "Content-Length": imageBuffer.length,
    });
  
    res.end(imageBuffer);
  
  } catch (error) {
    console.error("Error calling the API:", error);
  
    if (error.response) {
      res.status(error.response.status).json({ error: "API Error" });
  
    } else if (error.request) {
      console.error("No response from API:", error.request);
      res.status(500).json({ error: "No response from API" });
  
    } else {
      console.error("Error setting up the API request:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};


export const ImageToImage = async (req, res) => {
  try {
    const api_key = "SG_cdb02db099cb8b32";
    const { name } = req.query;
    const data = req.body;
    const url = `https://api.segmind.com/v1/${name}`;
    try {
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


export const UtilityFunction = async (req, res) => {
  try {
    const api_key = "SG_cdb02db099cb8b32";
    const { name } = req.query;
    const data = req.body;

    const url = `https://api.segmind.com/v1/${name}`;
    try {
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



export const FindAllModel = async (req, res) => {
  let responsedata;
  let data = [
    "inpaint-auto",
    "ip-sdxl-openpose",
    "ip-sdxl-canny",
    "ip-sdxl-depth",
    "sdxl-inpaint",
    "ssd-img2img",
    "sdxl-openpose",
    "ssd-depth",
    "ssd-canny",
    "stable-diffusion-2-1",
    "sdxl-txt2img",
    "tinysd1.5-txt2img",
    "sd1.5-inpainting",
    "sd1.5-img2img",
    "smallsd1.5-txt2img",
    "sd1.5-scifi",
    "sd1.5-rpg",
    "sd1.5-rcnz",
    "sd1.5-paragon",
    "sd1.5-outpaint",
    "sd1.5-manmarumix",
    "sd1.5-majicmix",
    "sd1.5-fruitfusion",
    "sd1.5-flat2d",
    "sd1.5-fantassifiedicons",
    "sd1.5-dvrach",
    "sd1.5-dreamshaper",
    "sd1.5-disneyB",
    "sd1.5-deepspacediffusion",
    "sd1.5-cuterichstyle",
    "sd1.5-colorful",
    "sd1.5-allinonepixel",
    "sd1.5-526mix",
    "qrsd1.5-txt2img",
    "potraitsd1.5-txt2img",
    "kandinsky2.1-txt2img",
    "sd1.5-controlnet-softedge",
    "sd1.5-controlnet-scribble",
    "sd1.5-controlnet-depth",
    "sd1.5-controlnet-canny",
    "codeformer",
    "sam-img2img",
    "sd2.1-faceswapper",
    "sd1.5-revanimated",
    "bg-removal",
    "esrgan",
    "sd1.5-controlnet-openpose",
    "sd1.5-samaritan_3d",
    "sd1.5-icbinp",
    "kandinsky2.1-txt2im"
  ];
  const url = "https://www.segmind.com/_next/data/yJgtaEtIfBEDG2_1phHT1/models.json";
  try {
    axios.get(url, {
      headers: {

        'Content-Type': 'application/json'
      }
    })
      .then(async response => {

        responsedata = response.data.pageProps.models.filter(obj => !data.includes(obj.slug));
        res.send(responsedata)
      })
      .catch(error => {
        res.send(error)

      });


  } catch (error) {
    console.log(error);
  }
}


export const FindOneModel = async (req, res) => {

  const { name } = req.query;
  const url = `https://www.segmind.com/_next/data/yJgtaEtIfBEDG2_1phHT1/models/${name}.json?route=${name}`;
  try {
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


export const Controlnets = async (req, res) => {
  try {
    const api_key = "SG_cdb02db099cb8b32";
    const { name } = req.query;
    const data = req.body;

    const url = `https://api.segmind.com/v1/${name}`;
    try {
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

export const SearchModel = async (req, res) => {

  const { title } = req.query
  const url = "https://www.segmind.com/_next/data/yJgtaEtIfBEDG2_1phHT1/models.json";
  try {
    axios.get(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        let filtervalue = response.data.pageProps.models.filter(model => model.title.includes(title))
        res.send(filtervalue)

      })
      .catch(error => {
        res.send(error)

      });


  } catch (error) {
    console.log(error);
  }
}


export const TextToImageDisplay = async (req, res) => {
  let responsedata = [];
  let data = ["segmind-vega,", "Segmind-VegaRT,", "Controlnet Inpainting,", "Samaritan 3D XL,", "SSD-1B,",
    "Copax Timeless SDXL,", "Realvis SDXL,", "Dreamshaper SDXL,", "sdxl1.0-txt2img,", "Samaritan,", "RPG,", "Realistic Vision,",
    "Juggernaut Final,", "Fantassified Icons,", "Epic Realism,", "Cyber Realistic,", "Kandinsky 2.2"]
  const url = "https://www.segmind.com/_next/data/yJgtaEtIfBEDG2_1phHT1/models.json";
  try {
    axios.get(url, {
      headers: {

        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        for (let i = 0; i < data.length; i++) {
          responsedata = [...responsedata, response.data.pageProps.models.filter(obj => data[i].includes(obj.slug))]
        }
        res.send(responsedata)
      })
      .catch(error => {
        res.send(error)

      });


  } catch (error) {
    console.log(error);
  }
}

export const ImageToImageDisplay = async (req, res) => {
  let responsedata = [];
  let data = ["Word2img"]
  const url = "https://www.segmind.com/_next/data/yJgtaEtIfBEDG2_1phHT1/models.json";
  try {
    axios.get(url, {
      headers: {

        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        for (let i = 0; i < data.length; i++) {
          responsedata = [...responsedata, response.data.pageProps.models.filter(obj => data[i].includes(obj.slug))]
        }
        res.send(responsedata)
      })
      .catch(error => {
        res.send(error)

      });


  } catch (error) {
    console.log(error);
  }
}

export const UtilityFunctionDisplay = async (req, res) => {
  let responsedata = [];
  let data = ["segmind-vega,", "Segmind-VegaRT,", "Controlnet Inpainting,", "Samaritan 3D XL,", "SSD-1B,",
    "Copax Timeless SDXL,", "Realvis SDXL,", "Dreamshaper SDXL,", "sdxl1.0-txt2img,", "Samaritan,", "RPG,", "Realistic Vision,",
    "Juggernaut Final,", "Fantassified Icons,", "Epic Realism,", "Cyber Realistic,", "Kandinsky 2.2"]
  const url = "https://www.segmind.com/_next/data/yJgtaEtIfBEDG2_1phHT1/models.json";
  try {
    axios.get(url, {
      headers: {

        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        for (let i = 0; i < data.length; i++) {
          responsedata = [...responsedata, response.data.pageProps.models.filter(obj => data[i].includes(obj.slug))]
        }
        res.send(responsedata)
      })
      .catch(error => {
        res.send(error)

      });


  } catch (error) {
    console.log(error);
  }
}

export const ControlnetsDisplay = async (req, res) => {
  let responsedata = [];
  let data = ["segmind-vega,", "Segmind-VegaRT,", "Controlnet Inpainting,", "Samaritan 3D XL,", "SSD-1B,",
    "Copax Timeless SDXL,", "Realvis SDXL,", "Dreamshaper SDXL,", "sdxl1.0-txt2img,", "Samaritan,", "RPG,", "Realistic Vision,",
    "Juggernaut Final,", "Fantassified Icons,", "Epic Realism,", "Cyber Realistic,", "Kandinsky 2.2"]
  const url = "https://www.segmind.com/_next/data/yJgtaEtIfBEDG2_1phHT1/models.json";
  try {
    axios.get(url, {
      headers: {

        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        for (let i = 0; i < data.length; i++) {
          responsedata = [...responsedata, response.data.pageProps.models.filter(obj => data[i].includes(obj.slug))]
        }
        res.send(responsedata)
      })
      .catch(error => {
        res.send(error)

      });


  } catch (error) {
    console.log(error);
  }
}
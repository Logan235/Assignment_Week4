import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import urlRoute from "./routes/urlRoute.js";
import { redirectUrl } from "./controller/redirectController.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err.message);
  });

// Routes
app.use("/api", urlRoute);
app.get("/:shortUrlTail", redirectUrl);

// const Url = mongoose.model("Url", urlSchema);

// // app.post("/api/urls", async (req, res) => {
//   const newUrl = await Url.create({
//     originalUrl: req.body.originalUrl,
//     shortUrl: req.body.shortUrl,
//   });

//   res.json(newUrl);
// });

// app.get("/api/urls", async (req, res) => {
//   const urls = await Url.find();
//   res.json(urls);
// });

// app.get("/api/urls/:id", async (req, res) => {
//   const url = await Url.findById(req.params.id);
//   res.json(url);
// });

// app.get("/:shortUrl", async (req, res) => {
//   const url = await Url.findOne({ shortUrl: req.params.shortUrl });

//   if (!url) {
//     return res.send("Not found");
//   }

//   url.clicks += 1;
//   await url.save();

//   res.redirect(url.originalUrl);
// });

// app.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

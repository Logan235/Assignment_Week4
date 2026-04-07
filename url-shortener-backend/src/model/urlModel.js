import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
  qrCode: String,
});

export default mongoose.model("Url", urlSchema);

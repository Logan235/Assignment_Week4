import Url from "../model/urlModel.js";
import { nanoid } from "nanoid";
import qrcode from "qrcode";

export const createUrl = async (req, res) => {
  try {
    // Take the longUrl
    const { longUrl } = req.body;
    // console.log("Received longUrl:", longUrl);

    // Check if longUrl already exists in the db
    const urlExists = await Url.findOne({ longUrl });
    if (urlExists) {
      return res.status(200).json({
        shortUrl: urlExists.shortUrl,
        qrCode: urlExists.qrCode,
      });
    }

    // Create shortUrl and QR code
    const shortCode = nanoid(7);
    const shortUrl = `http://localhost:2300/${shortCode}`;
    const qrCode = await qrcode.toDataURL(shortUrl);

    const newUrl = await Url.create({
      longUrl: longUrl,
      shortUrl: shortUrl,
      qrCode: qrCode,
    });
    // console.log("Created new URL:", newUrl);

    res.status(201).json({
      shortUrl: newUrl.shortUrl,
      qrCode: newUrl.qrCode,
    });
  } catch (error) {
    res.status(500).json({ errorCreateUrl: error.message });
  }
};

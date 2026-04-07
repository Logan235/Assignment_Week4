import Url from "../model/urlModel.js";

export const redirectUrl = async (req, res) => {
  try {
    // Take the shortUrl
    const { shortUrlTail } = req.params;
    const shortUrl = `http://localhost:2300/${shortUrlTail}`;

    //Check shortUrl if exists or not
    const shortUrlExists = await Url.findOne({ shortUrl: shortUrl });

    if (shortUrlExists) {
      return res.redirect(shortUrlExists.longUrl);
    } else {
      return res.status(404).send("<h1>URL NOT FOUND!</h1>");
    }
  } catch (error) {
    res.status(500).json({ errorRedirect: error.message });
  }
};

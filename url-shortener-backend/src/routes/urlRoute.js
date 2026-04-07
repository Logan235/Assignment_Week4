import express from "express";
import { createUrl } from "../controller/urlController.js";
import { redirectUrl } from "../controller/redirectController.js";

const router = express.Router();

// Create shortUrl and QR Code
router.post("/url", createUrl);

// Redirect to longUrl
router.get("/:shortUrl", redirectUrl);

export default router;

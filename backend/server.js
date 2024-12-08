const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const TMP_DIR = path.join(__dirname, "downloads"); // Directory for temporary files
if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR);
}

const PORT = process.env.PORT || 5000;

// Convert route
app.post("/convert", (req, res) => {
  const { url, format } = req.body;

  if (!url || !format) {
    return res
      .status(400)
      .json({ success: false, error: "URL and format are required." });
  }

  const allowedFormats = ["mp3", "mp4"];
  if (!allowedFormats.includes(format)) {
    return res.status(400).json({
      success: false,
      error: "Invalid format. Only MP3 and MP4 are supported.",
    });
  }

  const uniqueId = uuidv4();
  const fileName = `${uniqueId}.${format}`;
  const filePath = path.join(TMP_DIR, fileName);

  const metadataCommand = `yt-dlp --dump-json ${url}`; // Fetch video metadata

  exec(metadataCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error fetching metadata: ${stderr}`);
      return res
        .status(500)
        .json({ success: false, error: "Failed to fetch video metadata." });
    }

    let metadata;
    try {
      metadata = JSON.parse(stdout); // Parse metadata JSON
    } catch (parseError) {
      console.error("Error parsing metadata:", parseError);
      return res
        .status(500)
        .json({ success: false, error: "Failed to parse video metadata." });
    }

    const title = metadata.title; // Retrieve video title
    const thumbnail = metadata.thumbnail; // Retrieve video thumbnail URL
    const bestVideoFormat = metadata.formats.find(
      (f) => f.vcodec !== "none" && f.acodec !== "none"
    ); // Find the best video format

    // Choose the yt-dlp command based on the format
    const conversionCommand =
      format === "mp3"
        ? `yt-dlp -x --audio-format mp3 --output "${filePath}" ${url}` // Extract audio for MP3
        : `yt-dlp -f ${
            bestVideoFormat.format_id || "best"
          } --output "${filePath}" ${url}`; // Use best available resolution for MP4

    exec(conversionCommand, (convError, convStdout, convStderr) => {
      if (convError) {
        console.error(`Error converting video: ${convStderr}`);
        return res
          .status(500)
          .json({ success: false, error: "Conversion failed." });
      }

      console.log(`File converted: ${fileName}`);
      res.json({
        success: true,
        title, // Send the video title
        thumbnail, // Send the thumbnail URL
        fileName, // Unique file name
      });
    });
  });
});

// Download route
app.get("/download/:fileName", (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(TMP_DIR, fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, error: "File not found." });
  }

  const extension = path.extname(fileName).toLowerCase();
  const mimeType =
    extension === ".mp3"
      ? "audio/mpeg"
      : extension === ".mp4"
      ? "video/mp4"
      : "application/octet-stream";

  // Set headers for download
  res.setHeader("Content-Type", mimeType);
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

  const readStream = fs.createReadStream(filePath); // Stream the file
  readStream.pipe(res);

  // Delete file after download is complete
  res.on("finish", () => {
    fs.unlink(filePath, (unlinkErr) => {
      if (unlinkErr) {
        console.error(`Error deleting file: ${unlinkErr.message}`);
      } else {
        console.log(`File ${fileName} deleted successfully.`);
      }
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

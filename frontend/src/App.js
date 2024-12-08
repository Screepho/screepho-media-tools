import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Helmet } from "react-helmet";

function App() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp4");
  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    if (!url.trim()) {
      setError("Please enter a valid Instagram or YouTube URL!");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/convert`,
        { url, format }
      );

      setVideoDetails({
        title: response.data.title,
        thumbnail: response.data.thumbnail,
        fileName: response.data.fileName,
      });
    } catch (error) {
      console.error("Conversion failed:", error);
      alert("Failed to convert the video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Helmet>
        <title>
          {videoDetails
            ? `${videoDetails.title} | Convert to ${format.toUpperCase()}`
            : "Convert Instagram Reels and YouTube to MP3/MP4 | Screepho"}
        </title>
        <meta
          name="description"
          content={
            videoDetails
              ? `Download ${
                  videoDetails.title
                } in ${format.toUpperCase()} format with Screepho.`
              : "Convert Instagram Reels and YouTube videos to MP3 or MP4 with Screepho's easy-to-use downloader."
          }
        />
        <meta
          property="og:image"
          content={
            videoDetails?.thumbnail ||
            "https://via.placeholder.com/1200x630.png?text=Screepho"
          }
        />
      </Helmet>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a
            className="navbar-brand d-flex align-items-center"
            href="https://github.com/MHF0"
          >
            <img
              src="https://www.svgrepo.com/show/361181/github.svg"
              alt="Logo"
              className="d-inline-block align-text-top me-2"
              width={30}
            />
            <span className="fs-5">Mohammed Farhan</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://paypal.me/mhamadHfarhan?country.x=JO&locale.x=ar_EG"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Support (PayPal)
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://www.linkedin.com/in/mhmadhfarhan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://github.com/MHF0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5">
        <h1 className="text-center text-primary">
          Screepho Instagram and YouTube Downloader
        </h1>
        <p className="text-center text-muted">
          Convert Instagram Reels and YouTube videos into MP3 or MP4 format
          easily.
        </p>
        <div className="card p-4 shadow-sm mt-4">
          <div className="form-group mt-4">
            <input
              type="text"
              className={`form-control ${error ? "is-invalid" : ""}`}
              placeholder="Paste Instagram or YouTube URL here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              aria-label="Video URL"
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>
          <div className="form-group mt-3">
            <select
              className="form-control"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              aria-label="Select format"
            >
              <option value="mp3">MP3</option>
              <option value="mp4">MP4</option>
            </select>
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={handleConvert}
            disabled={loading}
            aria-label="Convert video"
          >
            {loading ? (
              <span>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
                Converting...
              </span>
            ) : (
              "Convert"
            )}
          </button>
        </div>

        {videoDetails && (
          <div className="mt-5">
            <div className="card">
              {videoDetails.thumbnail && (
                <img
                  src={videoDetails.thumbnail}
                  className="card-img-top"
                  alt={videoDetails.title || "Thumbnail"}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">
                  {videoDetails.title || "No Title Available"}
                </h5>
                <p className="card-text">
                  Your video has been converted to {format.toUpperCase()}.
                </p>
                <a
                  href={`${process.env.REACT_APP_API_URL}/download/${videoDetails.fileName}`}
                  className="btn btn-success"
                  download
                  aria-label="Download converted video"
                >
                  Download{" "}
                  {videoDetails.title
                    ? `${videoDetails.title}.${format}`
                    : `.${format}`}
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="text-center mt-auto py-3 bg-light">
        <p className="mb-0">
          Designed by{" "}
          <a
            href="https://screepho.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            Screepho.com
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

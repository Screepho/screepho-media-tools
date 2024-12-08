# **Screepho Media Tools**  

### Convert YouTube videos and Instagram Reels to MP3 or MP4 formats with ease

---

## **🚀 Features**

- **YouTube & Instagram Support**  
  Convert YouTube videos and Instagram Reels into MP3 or MP4 formats.

- **Dynamic Video Metadata**  
  Fetch and display video titles, thumbnails, and dynamically generate file names.

- **Responsive Frontend**  
  Built with **React.js** and **Bootstrap**, offering a seamless experience across devices.

- **Support Links in Navbar**  
  Direct links to **PayPal Donations**, **LinkedIn**, and **GitHub**.

- **Backend with Node.js**  
  Node.js backend services to handle conversion requests and serve files.

- **SEO-Optimized Helmet Integration**  
  Meta tags for video titles, thumbnails, and formats for better social sharing and search visibility.

---

## **📂 Project Structure**

```plaintext
├── backend/
│   ├── downloads/           # Directory for storing converted files
│   ├── .env                 # Environment variables for backend
│   ├── server.js            # Main backend server logic
│   ├── package.json         # Backend dependencies
│   ├── requirements.txt     # Python dependencies for video processing (if used)
│   ├── Dockerfile           # Docker configuration for backend
│   └── .gitignore           # Ignore unnecessary files for backend
├── frontend/
│   ├── public/              # Static assets for frontend
│   ├── src/                 # React source files
│   │   ├── App.js           # Main React component
│   │   ├── index.js         # Entry point for React
│   │   ├── App.css          # Styling for the React app
│   │   ├── logo.svg         # App logo
│   │   ├── reportWebVitals.js # Performance monitoring
│   │   └── setupTests.js    # Testing setup for React
│   ├── .env                 # Environment variables for frontend
│   └── package.json         # Frontend dependencies
├── .github/
│   ├── workflows/           # GitHub Actions workflows for CI/CD
│       └── auto-tag.yml     # Workflow for automated version tagging
├── README.md                # Documentation for the project
```

---

## **🔧 Installation**

### Prerequisites

- Node.js (v14+)
- Python 3.x (if used for video processing)
- Docker (optional, for containerized deployment)

### **Backend Setup**

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:

   ```plaintext
   PORT=5000
   OUTPUT_DIR=downloads
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

### **Frontend Setup**

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:

   ```plaintext
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:

   ```bash
   npm start
   ```

---

## **📖 Usage**

1. Open the frontend in your browser (usually at `http://localhost:3000`).
2. Paste the URL of a YouTube video or Instagram Reel.
3. Select the desired format (MP3 or MP4).
4. Click **Convert** to fetch the video and download it.

---

## **🌟 Upcoming Features**

1. Multi-language support for better accessibility.
2. Enhanced analytics dashboard for tracking downloads and user behavior.
3. Advanced settings for selecting custom resolutions and bitrates.

---

## **📥 Feedback**

Have suggestions or found an issue? Feel free to:

- Open an [issue](https://github.com/Screepho/screepho-media-tools/issues).
- Email us at [support@screepho.com](mailto:support@screepho.com).

---

## **💻 Deployment**

### **Using Docker**

1. Build the Docker image for the backend:

   ```bash
   docker build -t screepho-backend ./backend
   ```

2. Run the container:

   ```bash
   docker run -p 5000:5000 screepho-backend
   ```

---

## **💖 Support**

If you find this project helpful, consider supporting us:

- [Donate via PayPal](https://www.paypal.com/paypalme/mhamadHfarhan)
- [Connect on LinkedIn](https://www.linkedin.com/in/mhmadhfarhan)
- [Star the repository on GitHub](https://github.com/Screepho/screepho-media-tools)

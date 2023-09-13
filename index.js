const { getVideos } = require("./Services/notion");
const express = require("express");
const path = require("path");
const server = express();
const { app, BrowserWindow } = require("electron");
const WhichBrowser = require("which-browser");
require("dotenv").config();
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "./public/preload.js"),
    },
  });

  win.loadFile("./public/index.html");
}
try {
  app.whenReady().then(() => {
    createWindow();
  });
} catch (e) {
  console.log(
    'Running Node.js. Please Run "npx electron ." to open an interface. http://localhost:8000'
  );
}

server.use(express.static(path.resolve("./public")));
// Route for the about page
server.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "about.html"));
});

// Route for the home page (index)

server.get("/hospitals", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "hospitals.html"));
});

// Route for the index page (if index.html exists in 'public' folder)
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
server.get("/tips", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tips.html"));
});

server.listen(process.env.PORT, () => {
  console.log("server running on port " + process.env.PORT);
});

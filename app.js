import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT;

// Get directory & file names
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

// EJS VIEW TEMPLATE SETUP

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Setting Up EJS as the View Engine
app.set("view engine", "ejs");
// Setting the Views Directory
app.set("views", path.join(__dirname, "views"));

// END EJS VIEW TEMPLATE SETUP

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

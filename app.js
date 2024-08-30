import express from "express";
import path from "path";
import { router } from "./routes/router.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Get directory & file names
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

// EJS VIEW TEMPLATE SETUP

// Setup static folder
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

// Setting Up EJS as the View Engine
app.set("view engine", "ejs");
// Setting the Views Directory
app.set("views", path.join(__dirname, "views"));

// END EJS VIEW TEMPLATE SETUP

// Body parser middleware
// parse the form data into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use the router
app.use("/", router);

// Catch 404 and forward to error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

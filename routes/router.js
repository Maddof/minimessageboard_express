import express from "express";
import {
  createMessage,
  renderIndex,
  renderSingleMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/", renderIndex);

router.get("/new", (req, res) => {
  res.render("form");
});

router.get("/message/:id", renderSingleMessage);

router.post("/new", createMessage);

export { router };

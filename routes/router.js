import express from "express";
import {
  createMessage,
  renderIndex,
  renderSingleMessage,
  renderForm,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/", renderIndex);

router.get("/new", renderForm);

router.get("/message/:id", renderSingleMessage);

router.post("/new", createMessage);

export { router };

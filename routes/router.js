import express from "express";
import {
  createMessage,
  renderIndex,
  renderSingleMessage,
  renderForm,
  renderSearch,
  renderSearchQuery,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/", renderIndex);

router.get("/new", renderForm);

router.get("/search", renderSearch, renderSearchQuery);

router.get("/search-result", renderSearchQuery);

router.get("/message/:id", renderSingleMessage);

router.post("/new", createMessage);

export { router };

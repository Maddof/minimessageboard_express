import express from "express";
import { createMessage, messages } from "../controllers/messageController.js";

const router = express.Router();

const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "New message" },
];

router.get("/", (req, res) => {
  res.render("index", { messages: messages, links: links });
});

router.get("/new", (req, res) => {
  res.render("form");
});

router.post("/new", createMessage);

export { router };

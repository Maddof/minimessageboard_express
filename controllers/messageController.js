import { body, validationResult } from "express-validator";

const lengthNameErr = "must be between 1 and 10 characters.";
const lengthMessageErr = "must be between 1 and 50 characters.";

const messages = [
  {
    id: 1,
    user: "Bertil",
    text: "Hi there!",
    added: new Date(),
  },
  {
    id: 2,
    user: "Charles",
    text: "Hello World!",
    added: new Date(),
  },
  {
    id: 3,
    user: "Xavier",
    text: "Mind freeze!",
    added: new Date(),
  },
  {
    id: 4,
    user: "Amando",
    text: "Hello!",
    added: new Date(),
  },
  {
    id: 4,
    user: "Xavi",
    text: "Best midfielder!",
    added: new Date(),
  },
];

const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "New message" },
  { href: "/search", text: "Search message" },
];

// @desc Render all posts (index)
// @route GET /
const renderIndex = (req, res, next) => {
  res.render("index", {
    title: "Mini Messageboard",
    messages: messages,
    links: links,
  });
};

const validateMessage = [
  body("name")
    .trim()
    .isLength({ min: 1, max: 10 })
    .blacklist('<>"/') // Remove specific unwanted characters
    .escape() // Escape HTML characters
    .withMessage(`Name ${lengthNameErr}`),
  body("message")
    .trim()
    .isLength({ min: 1, max: 50 })
    .blacklist('<>"/') // Remove specific unwanted characters
    .escape() // Escape HTML characters
    .withMessage(`Message ${lengthMessageErr}`),
];

// @desc Create new message
// @route POST /new
const createMessage = [
  validateMessage,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).render("form", {
        title: "Error with your message",
        links: links,
        name: req.body.name,
        message: req.body.message,
        errors: errors.array(),
      });
    }

    const newMessage = {
      id: messages.length + 1,
      text: req.body.message,
      user: req.body.name,
      added: new Date(),
    };
    messages.push(newMessage);
    res.status(201).redirect("/");
  },
];

// @desc View single message
// @route GET /message/:id
const renderSingleMessage = (req, res, next) => {
  const id = parseInt(req.params.id);
  const message = messages.find((message) => message.id === id);
  if (!message) {
    const error = new Error(`A message with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  res.render("singleMessage", {
    title: "Message details",
    links: links,
    message: message,
  });
};

// @desc View form
// @route GET /form
const renderForm = (req, res, next) => {
  res.render("form", { title: "Adding new message", links: links });
};

// @desc View form
// @route GET /search
const renderSearch = (req, res, next) => {
  res.render("search", { title: "Search message", links: links });
};

// @desc View search query
// @route GET /search
const renderSearchQuery = (req, res, next) => {
  const name = req.query.name;
  const result = messages.filter((message) =>
    message.user.toLowerCase().includes(name.toLowerCase())
  );
  res.render("search-result", { links: links, name: name, messages: result });
};

export {
  messages,
  links,
  createMessage,
  renderIndex,
  renderSingleMessage,
  renderForm,
  renderSearch,
  renderSearchQuery,
};

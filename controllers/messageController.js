import { body, validationResult } from "express-validator";

const alphaErr = "must only contain letters.";
const lengthNameErr = "must be between 1 and 10 characters.";
const lengthMessageErr = "must be between 1 and 50 characters.";

const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Bertil",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
  {
    id: 3,
    text: "Mind freeze!",
    user: "Xavier",
    added: new Date(),
  },
  {
    id: 4,
    text: "Hello!",
    user: "Amando",
    added: new Date(),
  },
];

const links = [
  { href: "/", text: "Home" },
  { href: "/new", text: "New message" },
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
    .isAlpha()
    .withMessage(`Name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Name ${lengthNameErr}`),
  body("message")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage(`Message ${lengthMessageErr}`),
];

// @desc Create new message
// @route POST /new
const createMessage = [
  validateMessage,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
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

// // @desc Create new message
// // @route POST /new
// const createMessage = (req, res, next) => {
//   const newMessage = {
//     id: messages.length + 1,
//     text: req.body.message,
//     user: req.body.name,
//     added: new Date(),
//   };
//   if (!newMessage.text || !newMessage.user) {
//     const error = new Error(`Please fill all form fields`);
//     error.status = 400;
//     return next(error);
//   }
//   messages.push(newMessage);
//   res.status(201).redirect("/");
// };

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

export {
  messages,
  links,
  createMessage,
  renderIndex,
  renderSingleMessage,
  renderForm,
};

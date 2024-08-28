const messages = [
  {
    id: 1,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 2,
    text: "Hello World!",
    user: "Charles",
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

// @desc Create new message
// @route POST /new
const createMessage = (req, res, next) => {
  const newMessage = {
    text: req.body.message,
    user: req.body.name,
    added: new Date(),
  };
  if (!newMessage.text || !newMessage.user) {
    const error = new Error(`Please fill all form fields`);
    error.status = 400;
    return next(error);
  }
  messages.push(newMessage);
  res.status(201).redirect("/");
};

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
  res.render("singleMessage", { message: message });
};

// @desc View form
// @route GET /form
const renderForm = (req, res, next) => {
  res.render("form", { title: "Adding new message" });
};

export {
  messages,
  createMessage,
  renderIndex,
  renderSingleMessage,
  renderForm,
};

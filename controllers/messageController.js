const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

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

export { messages, createMessage };

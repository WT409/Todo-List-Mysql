const validateTitle = (req, res, next) => {
  const { title } = req.body;

  if (title === undefined) {
    return res.status(400).json({ message: 'The field "title" is required' });
  }

  if (title === '') {
    return res.status(400).json({ message: 'title cannot be empty' });
  }

  if(title.length > 45) {
    return res.status(400).json({message: 'The length of "title" is very long'});
  }

  next();
};

export { validateTitle };
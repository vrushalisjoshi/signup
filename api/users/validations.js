const validations = (req, res, next) => {
  let errorMessage = "";

  if (
    "" == req.body.firstName ||
    "" == req.body.lastName ||
    "" == req.body.email ||
    "" == req.body.password
  ) {
    errorMessage =
      "First Name, Last Name, Email, Password fields are mandatory";
    res.status(403).send(errorMessage);
    return;
  }
  if (req.body.password.length < 8) {
    errorMessage = "Password Field should have at least Eight Characters";
    res.status(403).send(errorMessage);
    return;
  }
  next();
};

module.exports = validations;

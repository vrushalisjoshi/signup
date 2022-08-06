
module.exports = {
  signup: (req, res, next) => {
    try {
      const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        isSubscribe: !!req.body.isSubscribe,
      };

      let message = `Hello ${user.firstName} ${user.lastName}, Thank you for signing up. Your account is now created. `;
      if (user.isSubscribe) {
        message += `You would be receiving our periodic newsletters to your email: ${user.email}`;
      }

      res.status(200).send(message);
    } catch (err) {
      res.status(500).send(err);
    }
  },
};

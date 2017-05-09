// Our new dependencies
import jwt from 'jsonwebtoken';
import moment from 'moment';
// We import the User model we have just defined
import User from '../models/user';
// The config file contains the secret to sign the token
import config from '../../config';

// Utility function to create and return the token, it requires TOKEN_SECRET from config
const createToken = name => {
  var payload = {
    sub: name,
    exp: moment().add(1, 'day').unix()
  };
  return jwt.sign(payload, config.TOKEN_SECRET);
}

// signup function for the /auth/signup route
const signup = (req, res) => {
  // query the database to make sure the e-mail is not taken already
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (existingUser) {
    // HTTP 409 status is sent in case the e-mail is taken
      return res.status(409).json({ message: 'Email is already taken' });
    }

    // A new user is created with the information sent by the client
    const user = Object.assign(new User(), req.body);
    user.save((err, result) => {
      if (err) {
        res.send(err);
      }
      // Notice we also send the token as we want the user to be immediately logged in
      res.json({
        message: 'Welcome to Albums, you are now logged in',
        token: createToken(result.name)
      });
    });
  });
};

// Login function for /auth/login
const login = (req, res) => {
  // Query the database for user with that specific e-mail
  User.findOne({ email: req.body.email }, '+password', (err, user) => {
    if (!user) {
    // If the user doesn't exist just send a HTTP 401 status
      return res.status(401).json({ message: 'Invalid email/password' });
    }
    /* If the user exists, the password sent by the client is compared with the one in the db
    with the utilily function comparePwd
   */
    user.comparePwd(req.body.password, (err, isMatch) => {
      if (!isMatch) {
    // In case of wrong password, we send another HTTP 401 status
        return res.status(401).send({ message: 'Invalid email/password' });
      }
      // Correct information from the client, a token is sent
      res.json({ message: 'You are now logged in', token: createToken(user.name) });
    });
  });
};

// verifyAuth middleware to protect post and delete routes
const verifyAuth = (req, res, next) => {
  // Get the token from the header x-access-token
  const token = req.headers['x-access-token'];
  if (token) {
    // Verifies the token and the expiration
    jwt.verify(token, config.TOKEN_SECRET, function(err, payload) {
      // If the verification fails it returns http status 403
      if (err) {
        return res.status(403).send({
          message: 'Failed to authenticate token.'
        });
      } else {
        // Goes to the next route since there are no errors
        next();
      }
    });
  } else {
    // Requests without token return http status 403
    return res.status(403).send({
        message: 'No token provided.'
    });
  }
};

// Export the functions for server.js
export {
  signup,
  login,
  verifyAuth
};
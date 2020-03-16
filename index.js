const next = require('next');
const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

const AUTH_USER_TYPE = 'authenticated';
const COOKIE_SECRET = 'randomstring';
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true,
};

const authenticate = async (email, password) => {
  const { data } = await axios.get('http://jsonplaceholder.typicode.com/users');
  return data.find(user => {
    if (user.email === email && user.website === password) {
      return user;
    }
  });
};

app.prepare().then(() => {
  const server = express();

  server.use(express.json());
  server.use(cookieParser(COOKIE_SECRET));

  server.post('/api/login', async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await authenticate(email, password);
    if (!user) {
      return res.status(403).send('Invalid Email or Password');
    }
    const userData = {
      name: user.name,
      email: user.email,
      type: AUTH_USER_TYPE,
    };
    res.cookie('token', userData, COOKIE_OPTIONS);
    res.status(200).json(userData);
  });

  server.get('/api/profile', async (req, res) => {
    const { signedCookies = {} } = req;
    const { token } = signedCookies;
    if (token && token.email) {
      const { data } = await axios.get(
        'http://jsonplaceholder.typicode.com/users',
      );
      const userProfile = data.find(user => user.email === token.email);
      console.log('MY TOKEN', userProfile);
      return res.status(200).json(userProfile);
    } else {
      return res.status(404).json({ message: 'Error cant find user' });
    }
  });

  server.get('*', (req, res) => {
    handle(req, res);
  });

  server.listen(PORT, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(`Running on a port ${PORT}`);
    }
  });
});

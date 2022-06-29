const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static('dist'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

// // anoter way
// app.get('/', (req, res) => {
//   res.render('index');
// });

app.post('/', (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: 'tetiana.bron@meta.ua',
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: 'tetiana.bron@meta.ua',
    to: 'tanya_nest@ukr.net',
    subject: 'Message from my portfolio form',
    text: `${req.body.text}. Отправитель: ${req.body.name}, email: ${req.body.email}.`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent');
      res.send('success');
    }
  });
});

app.listen(PORT, () => {
  console.log('Server is running');
});

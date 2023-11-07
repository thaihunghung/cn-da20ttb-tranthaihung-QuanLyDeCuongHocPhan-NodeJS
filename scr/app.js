const path = require('path');
const fs = require('fs');
const pdf = require('html-pdf');
const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const handlebars = require('handlebars');
const dotenv = require('dotenv')
//khoi tao dotenv
dotenv.config();


//su dung templates hbs
app.use(express.urlencoded({ extended: true }));
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: path.join(__dirname, '/views/partials'),
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, './views'));







app.get('/', (req, res) => {
  res.render('home')
})

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`)
})
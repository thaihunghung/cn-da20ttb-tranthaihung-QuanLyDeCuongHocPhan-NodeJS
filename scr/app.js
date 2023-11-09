const path = require('path');
const fs = require('fs');
const pdf = require('html-pdf');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv')
const monHocRoutes = require('./routes/monHoc');
const db = require('./database/config.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connect();
//khoi tao dotenv
dotenv.config();
//khoi tao public folder
app.use(express.static(__dirname + '/public/css'));

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.render('formInput_monHoc/formInput_monHoc.hbs')
})

app.use('/monhoc', monHocRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`)
})
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv')
const monHocRoutes = require('./routes/monHocRoute.js');
const loginRoutes = require('./routes/loginRoute.js');
const db = require('./database/config.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connect();
//khoi tao dotenv
dotenv.config();
//khoi tao public folder

app.use(express.static(path.join(__dirname, 'public')))

//su dung templates hbs
app.use(express.urlencoded({ extended: true }));
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: path.join(__dirname, 'views','partials'),
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/monhoc', monHocRoutes);

app.all('/pdf', (req, res) => {
  const a4Content = req.body.a4Content;
  console.log(a4Content)
  // Đọc nội dung CSS từ file
  const cssContent = fs.readFileSync('./public/css/print/print.css', 'utf-8');
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    htmlContent = `<html><head><style>${cssContent}</style></head><body>${a4Content}</body></html>`;
    
    await page.setContent(htmlContent);
    const pdfOptions = {
      path: 'output.pdf',
      format: 'A4',
      margin: {
        top: '2cm',
        right: '2cm',
        bottom: '2cm',
        left: '3cm',
      },
    };
  
    // Generate the PDF with specified margins
    await page.pdf(pdfOptions);
    await browser.close();
  })();
});
// app.use('/login', loginRoutes);

app.get('/', (req, res) => {
  res.render('formInput_monHoc/formInput_monHoc.hbs')
})



const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`)
})
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv')
// // // // 
// Routes     
// // // // 
const monHocRoutes = require('./routes/monHocRoute.js');
const chuongrouter = require('./routes/ChuongRoute.js');
// const loginRoutes = require('./routes/loginRoute.js');
const db = require('./database/config.js');
// const verifyToken = require('./middleware/verifyToken');
const cookieParser = require('cookie-parser');
const HocPhan = require('./models/hocPhan.model.js');
const morgan = require('morgan');
morgan('combined')
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


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
  helpers: {
    isEqualLoaiHocPhan: function (value, targetValue, options) {
      return value === targetValue ? options.fn(this) : options.inverse(this);
    }
  }
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.get('/protected', verifyToken, (req, res) => {
//   res.json({ message: 'Access granted', userId: req.userId });
// });

// app.use('/login', loginRoutes)
app.use('/monhoc', monHocRoutes);
app.use('/chuong', chuongrouter);
app.all('/pdf', (req, res) => {
  const a4Content = req.body.a4Content;
  console.log(a4Content)
  // Đọc nội dung CSS từ file
  const cssContent = fs.readFileSync('./public/css/print/print.css', 'utf-8');
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    htmlContent = `<html><head><style>${cssContent}</style></head><body>${a4Content}<script>const valueRecord = 'Chuyên ngành';function updateCheckbox(checkboxId) {var checkbox = document.getElementById(checkboxId);if (checkbox.value === valueRecord) {checkbox.checked = true;} else {checkbox.checked = false;}}updateCheckbox('LoaiHocPhan1');updateCheckbox('LoaiHocPhan2');updateCheckbox('LoaiHocPhan3');</script></body></html>`;
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
// const HocPhan = require('./models/fulldatabase');
app.post('/saveHocPhan',  (req, res) => {
  console.log('Request Body:', req.body);
  const { MaMon, TenMon } = req.body;

  // Create a new instance of the HocPhan model
  const hocPhan = new HocPhan({ MaMon, TenMon });

  // Save the data to the database
  hocPhan.save()
      .then(savedData => {
          console.log('Data saved successfully:', savedData);
          res.json({ success: true, data: savedData });
      })
      .catch(error => {
          console.error('Error saving data:', error);
          res.status(500).json({ success: false, error: 'Internal Server Error' });
      });
  // await hocPhanInstance.findOne({ MaMon:, TenMon: });        
});
app.get('/', (req, res) => {
  // res.render('formInput_monHoc/formInput_monHoc.hbs')
  res.render('test/formInput_monHoc_test')
})
app.post('/test', async (req, res) => {
  // Handle the incoming JSON data
  const hocPhanData = req.body;
  
  console.log('Received data:', hocPhanData);

  try {
    // Create a new instance of the HocPhan model with the received data
    const hocPhanInstance = new HocPhan(hocPhanData);

    // Save the instance to the database
    const savedHocPhan = await hocPhanInstance.save();

    console.log('Data saved to the database:', savedHocPhan);

    // Send a response back to the client
    res.json({ message: 'Data received and saved successfully' });
  } catch (error) {
    console.error('Error saving data to the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/test', (req, res) => {
  
  
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`)
})
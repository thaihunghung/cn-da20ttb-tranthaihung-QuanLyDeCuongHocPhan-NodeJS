const path = require('path');
const puppeteer = require('puppeteer');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const jwt = require('jsonwebtoken');
app.use(cookieParser());
const dotenv = require('dotenv');
const TempLate = require('./models/Template/Template');
const PLO = require('./models/Chuongtrinh/PLO.model');
const {mongooseToObject,MutipleMongooseToObject} = require('./util/mongoose');
// // // // // // 
// Routes     
// // // // // //
const UpdateRouter = require('./routes/ChuongRoute.js');
const loginRoutes = require('./routes/loginRoute.js');
const homeRoutes = require('./routes/homeRoutes.js');
const chuongtrinhRoutes = require('./routes/chuongTrinhRoute.js'); 
const hocphanRoutes = require('./routes/HocPhanRoute.js');
const projectRoutes = require('./routes/projectRoute.js');
const userRoutes = require('./routes/userRoutes.js');
const template = require('./routes/templateRoute.js');
const db = require('./database/config.js');
// // // // // // 
// Routes     
// // // // // //



const morgan = require('morgan');

morgan('combined')
db.connect();
//khoi tao dotenv
dotenv.config();
//khoi tao public folder
app.use(express.static(path.join(__dirname, 'public')))
app.use('/pdfs', express.static('pdfs'))
//su dung templates hbs
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  partialsDir: path.join(__dirname, 'views','partials'),
  helpers: require('./helperHBS/helpers.js'),
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// app.use('/monhoc', monHocRoutes);
app.use('/update', UpdateRouter);
app.use('/login', loginRoutes);
app.use('/home', homeRoutes);
app.use('/chuongtrinh', chuongtrinhRoutes);
app.use('/hung',hocphanRoutes);
app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/template',template)
// const HocPhan = require('./models/fulldatabase');
// app.post('/saveHocPhan',  (req, res) => {
//   console.log('Request Body:', req.body);
//   const { MaMon, TenMon } = req.body;

//   // Create a new instance of the HocPhan model
//   const hocPhan = new HocPhan({ MaMon, TenMon });

//   // Save the data to the database
//   hocPhan.save()
//       .then(savedData => {
//           console.log('Data saved successfully:', savedData);
//           res.json({ success: true, data: savedData });
//       })
//       .catch(error => {
//           console.error('Error saving data:', error);
//           res.status(500).json({ success: false, error: 'Internal Server Error' });
//       });
//   // await hocPhanInstance.findOne({ MaMon:, TenMon: });        
// });
app.get('/',async (req, res) => {
  function compileMethod(templateString, data) {
    // Biên dịch template
    const compiledTemplate = Handlebars.compile(templateString);
    return compiledTemplate(data);
}
const DataHeader = {
    HocPhan: {
      PhuLuc: 'F',
      TenMon:'[Tên học phần]',
      MaMon:'[Mã học phần]'
    }
}
  const tample = await TempLate.find({compileMethod:'header'});
    let compiledTemplates = [];
    tample.forEach(template => {
        let compiled;
        switch (template.compileMethod) {
            case "header":
                compiled = compileMethod(template.htmlContent, DataHeader);
                break;
        }
        compiledTemplates.push(compiled);
    });
 
    let compiledString = compiledTemplates.join('');
    
    const plo = await PLO.find();
    if (plo) {
      var plo_Object = plo.map(mongooseToObject)  
    }
    let currentLoaiCDR_CT = null;

    const processedPLOs = plo_Object.map((plo) => {
    if (plo.LoaiCDR_CT !== currentLoaiCDR_CT) {
        currentLoaiCDR_CT = plo.LoaiCDR_CT;
        return { ...plo, newGroup: true }; // Đánh dấu đây là một nhóm mới
    }
    return plo;
    });
 res.render('formInput_monHoc/formInput_monHoc',{
            tample:compiledString,
            PLO: plo_Object,
            processedPLOs: processedPLOs
          })
  //res.render('test/test2');
  //project/project
  //res.render('project/project');
  //res.render('admin/HomePageAdmin');
})
// app.post('/test', async (req, res) => {
//   // Handle the incoming JSON data
//   const hocPhanData = req.body;
  
//   console.log('Received data:', hocPhanData);

//   try {
//     // Create a new instance of the HocPhan model with the received data
//     const hocPhanInstance = new HocPhan(hocPhanData);

//     // Save the instance to the database
//     const savedHocPhan = await hocPhanInstance.save();

//     console.log('Data saved to the database:', savedHocPhan);

//     // Send a response back to the client
//     res.json({ message: 'Data received and saved successfully' });
//   } catch (error) {
//     console.error('Error saving data to the database:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
// app.get('/test', (req, res) => {
// });

app.post('/pdf', (req, res) => {
  const a4Content = req.body.a4Content;
  
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

// Error handling middleware (if needed)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`)
})


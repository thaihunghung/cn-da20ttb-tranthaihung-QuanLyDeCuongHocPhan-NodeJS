const path = require('path');
const puppeteer = require('puppeteer');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const jwt = require('jsonwebtoken');
app.use(cookieParser());
const dotenv = require('dotenv');
const TempLate = require('./models/Template/Template');
const PLO = require('./models/Chuongtrinh/PLO.model');
const DapUng_CDRData = require('./models/HocPhan/DapUngCDR.model');
const CDR_HOCPHAN = require('./models/HocPhan/Cdr_HocPhan.model');

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
const admin = require('./routes/adminRoute.js');
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
app.use('/program', chuongtrinhRoutes);
app.use('/hung',hocphanRoutes);
app.use('/user', userRoutes);
app.use('/project', projectRoutes);
app.use('/template',template)
app.use('/admin',admin)
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
//   function compileMethod(templateString, data) {
//     // Biên dịch template
//     const compiledTemplate = Handlebars.compile(templateString);
//     return compiledTemplate(data);
// }
// const DataHeader = {
//     HocPhan: {
//       PhuLuc: 'F',
//       TenMon:'[Tên học phần]',
//       MaMon:'[Mã học phần]'
//     }
// }
//   const template = await TempLate.find().sort({ order: 1 })
//   const templates = template.map(mongooseToObject);
    
//     const plo = await PLO.find();
//     if (plo) {
//       var plo_Object = plo.map(mongooseToObject)  
//     }
//     let currentLoaiCDR_CT = null;

//     const processedPLOs = plo_Object.map((plo) => {
//     if (plo.LoaiCDR_CT !== currentLoaiCDR_CT) {
//         currentLoaiCDR_CT = plo.LoaiCDR_CT;
//         return { ...plo, newGroup: true }; // Đánh dấu đây là một nhóm mới
//     }
//     return plo;
//     });
async function fetchDataForCDRHocPhanData(cdrHocPhanData) {
  try {
    const result = [];

    for (let i = 0; i < cdrHocPhanData.length; i++) {
      const _id = cdrHocPhanData[i]._id;
      const dapUngRecords = await DapUng_CDRData.find({ MaCDR_MH: _id });
      result.push(...dapUngRecords); // Sử dụng spread operator ở đây
    }

    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}


app.get('/',async (req, res) => {

      const CDR_HP = await CDR_HOCPHAN.find({MaHP:'hung2:1'})
      const DapUng_Data =await  fetchDataForCDRHocPhanData(CDR_HP);
      const plo = await PLO.find({});

      const CDR_HP_OB = CDR_HP.map(mongooseToObject);
      const DapUng = DapUng_Data.map(mongooseToObject);
      const plo_OB = plo.map(mongooseToObject);

              // Tao group PLO theo loai
      const groupedCDR = CDR_HP_OB.reduce((grouped, item) => {
                const key = item.loai_CDRMH;
                if (!grouped[key]) {
                  grouped[key] = [];
                }
                grouped[key].push(item);
                return grouped;
      }, {});

      res.render('home');



    // const cdrHocPhanData = await CDR_HocPhanModel.find({}).populate('MaHP');
    // const cdrCTData = await PLO.find({});
    // const dapungCDRData = await Dapung_CDRModel.find({}).populate('Ten_CDR MaCDR_MH');

    
    
    // // Chuyển đổi sang object
    // const posObjects = PO.map(mongooseToObject);
    // const ploObjects = PLO.map(mongooseToObject);
    // const mappingObjects = DapungCT.map(mongooseToObject);
    // const chuongTrinhAsObject = chuongTrinh.map(mongooseToObject);



 //res.render('formInput_monHoc/formInput_monHoc',{tample:compiledString,PLO: plo_Object,processedPLOs: processedPLOs})
  
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

app.post('/pdf',async (req, res) => {
  const a4Content = req.body.a4Content;

  // Đọc nội dung CSS từ file
const cssPath = path.join(__dirname, 'public/pdf/print.css');

var cssContent = fs.readFileSync(cssPath, 'utf-8');

try {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const htmlContent = `<html><head><style>${cssContent}</style></head><body>${a4Content}</body></html>`;
  await page.setContent(htmlContent);

  // Đường dẫn đầy đủ đến thư mục 'public/pdf'
  const outputPath = path.join(__dirname, 'public/pdf/output.pdf');

  const pdfOptions = {
    path: outputPath,
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
  res.json({ pdfPath: '/pdf/output.pdf' });
} catch (error) {
  console.error('Error:', error);
  res.status(500).send('Internal Server Error');
}
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening http://localhost:${port}`)
})


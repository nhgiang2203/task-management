const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config();
const database = require('./config/database');


database.connect();

//Routes ver 1
const routesVer1 = require('./api/v1/routes/index.route');

const app = express();
const port = process.env.PORT;

//Chỉ định domain thì dùng thêm conrsOption:
// const corsOptions = {
//   origin: 'http://example.com'
// };
// app.use(cors(corsOptions));

//Domain nào cũng lấy được api
app.use(cors());

//parse application/json
app.use(bodyParser.json());

//Routes Ver1
routesVer1(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
const express = require('express');
const methodOverride = require('method-override');
const flash = require('express-flash');
const multer  = require('multer');

const app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
require('dotenv').config();

const port = process.env.PORT;

app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

const database = require("./config/database.js");
database.connect();
const systemConfig = require("./config/system.js");

app.use(express.static('public'));
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");


app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');

//flash
app.use(cookieParser('ghjkkj'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());


// App Locals Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.use(express.static(`${__dirname}/public`));

route(app);
routeAdmin(app); 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
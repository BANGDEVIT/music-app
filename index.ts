import  express,{Express,Request,Response}  from "express";
import dotenv from 'dotenv';
import * as database from "./config/database";
import cors  from 'cors';
import path from "path";
import bodyParser from "body-parser";
import clientRoute from "./routers/client";
import adminRoute from "./routers/admin";
import { systemconfix } from "./config/confix";

dotenv.config();
database.connect();

const app: Express = express();

const port : number | string = process.env.PORT || 3004;

app.set("views", `${__dirname}/views`);
app.set("view engine","pug");

app.use(express.static(`${__dirname}/public`));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json sử dụng cái này là ko cần sài body-parser
// app.use(express.json())
// app.use(express.urlencoded({extended : true}))

app.use(cors());

// Use tinymce
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));
// End tinymce


//app local variables
app.locals.prefixAdmin =systemconfix.prefixAdmin

//Admin Routes
adminRoute(app)

//Client Routes
clientRoute(app)

app.listen(port,() =>{
  console.log(`Server is running on port ${port}`);
})
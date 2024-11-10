import  express,{Express,Request,Response}  from "express";
import dotenv from 'dotenv';
import * as database from "./config/database";
import cors  from 'cors';

import clientRoute from "./routers/client";

dotenv.config();
database.connect();

const app: Express = express();

const port : number | string = process.env.PORT || 3004;

app.set("views", "./views");
app.set("view engine","pug");

app.use(express.static("public"));

app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(cors());

clientRoute(app)

app.listen(port,() =>{
  console.log(`Server is running on port ${port}`);
})
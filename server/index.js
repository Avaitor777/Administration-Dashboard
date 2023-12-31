import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from "./routes/client.js"
import generalRoutes from "./routes/general.js"
import managementRoutes from "./routes/client.js"
import salesRoutes from "./routes/sales.js"

//configurations 
dotenv.config();
const app = express();
app.use(express.json());  //invoked
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));  //for cross-origin sharing request
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


//routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);


//mongoos setup
const PORT = process.env.PORT || 9000;
 mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,      //setup parameters
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));
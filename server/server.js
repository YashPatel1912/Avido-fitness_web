import express from "express";
import cors from "cors";
import session from "express-session";
import flash from "connect-flash";
import cookieParser from "cookie-parser";
import reqestIp from "request-ip";
import { authRoute } from "./router/authRoute.js";
import dotenv from "dotenv";
import {
  membershipPlanCheck,
  verifyAuthentiocationUser,
} from "./middleware/authmiddleware.js";

import connectMySQL from "express-mysql-session";

const MySQLStore = connectMySQL(session);

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://avido-fitness.netlify.app",
    credentials: true,
  })
);
const store = new MySQLStore({
  host: process.env.MYSQL_HOSTNAME,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_NAME,
});

app.use(
  session({
    secret: "validation",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    },
  })
);

app.use(flash());
app.use(reqestIp.mw());

app.use(verifyAuthentiocationUser);
app.use(membershipPlanCheck);
app.use((req, res, next) => {
  res.locals.user = req.user;
  return next();
});

app.use("/", authRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
);

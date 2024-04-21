import express, { json } from "express";
import userRouter from "./route/user.route.js";
import adminRouter from "./route/admin.route.js";
import { connectDB } from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(json());
app.use(cors());
app.use(cookieParser());

app.use("/user", userRouter);
app.use("/admin", adminRouter);

connectDB(process.env.MONGO_URL)
  .then(() => {
    console.log("Db is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.status(200).json("Server is running fine");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

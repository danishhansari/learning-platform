import express, { json } from "express";
import userRouter from "./route/user.route.js";
import adminRouter from "./route/admin.route.js";
import { connectDB } from "./db/index.js";

const app = express();
app.use(json());

app.use("/user", userRouter);
app.use("/admin", adminRouter);

connectDB(process.env.MONGO_URL)
  .then(() => {
    console.log("Db is connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

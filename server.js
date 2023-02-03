import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoute.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
//import jwt from "jsonwebtoken";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => console.log(err.message));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed", seedRouter);
app.use("api/products", productRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});

// const adminUser = {
//   email: "admin@example.com",
//   password: "12345",
// };

// const jwtToken = jwt.sign(
//   JSON.stringify(adminUser),
//   process.env.JWT_SECRET,
//   "60 * 30"
// );
// console.log("token :", jwtToken);

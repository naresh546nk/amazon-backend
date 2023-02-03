import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { generateToken } from "../util.js";
import expressAsyncHandler from "express-async-handler";

const userRouter = express.Router();

userRouter.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const newUser = {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };

        res.send({ ...newUser, token: generateToken(newUser) });
      }
      return;
    }

    res.status(401).send({ message: "Invalid email or password" });
  })
);

export default userRouter;

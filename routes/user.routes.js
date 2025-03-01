import {Router} from "express";

import authorize from "../middlewares/auth.middleware.js";
import { getUser, getUsers } from "../contollers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id",authorize, getUser);

userRouter.post("/", (req, res)=> { res.send({title: "create new user"})});

userRouter.put("/:id", (req, res)=> { res.send({title: "Update user"})});

userRouter.delete("/:id", (req, res)=> { res.send({title: "Delete the user"})});


export default userRouter;

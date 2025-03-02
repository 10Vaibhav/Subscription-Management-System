import {Router} from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscription } from "../contollers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req,res) =>{res.send({title: "Get all subscription"})});

subscriptionRouter.get("/:id", (req,res) =>{res.send({title: "Get subscription details"})});

subscriptionRouter.post("/",authorize , createSubscription);

subscriptionRouter.put("/:id", (req,res) =>{res.send({title: "update subscription"})});

subscriptionRouter.delete("/:id", (req,res) =>{res.send({title: "Delete subscription"})});

subscriptionRouter.get("/user/:id",authorize ,getUserSubscription);

subscriptionRouter.get("/:id/cancel", (req,res) =>{res.send({title: "cancel subscription"})});

subscriptionRouter.get("/upcoming-renewals", (req,res)=> {res.send({title: "Get Upcoming Renewals"})});


export default subscriptionRouter;
import {Router} from "express";
import authorize from "../middlewares/auth.middleware.js";
import Subscription from "../models/subscription.model.js";
import {
    cancelSubscription,
    createSubscription,
    deleteSubscription,
    getUpcomingRenewals,
    getUserSubscription,
    updateSubscription,
} from "../contollers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/",authorize , async (req,res, next) =>{
    try{
        const subscriptions = await Subscription.find();
        res.status(200).json({
            success: true,
            data: subscriptions,
        })
    }catch(error){
        next(error);
    }
});

subscriptionRouter.get("/:id",authorize ,async (req,res) =>{
    try{

        const subscription = await Subscription.findById(req.params.id);
        if(!subscription){
            return res.status(404).json({
                message: "Subscription not found"
            })
        }

        res.status(200).json({
            success: true,
            data: subscription
        });

    }catch (error){
        next(error);
    }
});

subscriptionRouter.post("/",authorize , createSubscription);

subscriptionRouter.put("/:id",authorize, updateSubscription);

subscriptionRouter.delete("/:id",authorize, deleteSubscription);

subscriptionRouter.get("/user/:id",authorize ,getUserSubscription);

subscriptionRouter.get("/:id/cancel", authorize, cancelSubscription);

subscriptionRouter.get("/upcoming-renewals",authorize, getUpcomingRenewals);


export default subscriptionRouter;
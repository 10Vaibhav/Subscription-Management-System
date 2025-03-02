import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from "../models/subscription.model.js";
import { sendReminderEmail } from "../utils/send-email.js";

// Calling dayjs() without parameters returns a fresh Day.js object with the current date and time.
const REMINDERS = [7, 5, 2, 1];

export const sendReminders = serve(async (context) => {
    const {subscriptionId} = context.requestPayload;
    const subscription = await fetchSubscription(context, subscriptionId);

    if(!subscription || subscription.status !== "active"){
        return;
    }

    const renewalDate = dayjs(subscription.renewalDate);

    if(renewalDate.isBefore(dayjs())){
        console.log(`Renewal date has passed for subscription ${subscriptionId}. stopping workflow`);
        return;
    }

    for (const daysBefore of REMINDERS){
        const reminderDate = renewalDate.subtract(daysBefore, "day");
        // renewal Date = 22feb, reminderDate= 15feb,17,20,21

        if(reminderDate.isAfter(dayjs())){
            await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
        }

        if(dayjs.isSame(reminderDate, "day")){
            await triggerReminder(context, `${daysBefore} days before reminder`, subscription);
        }
    }
});

const fetchSubscription = async (context, subscriptionId) => {
    return await context.run("get subscription", async ()=> {
        return await Subscription.findById(subscriptionId).populate("user", "name email");
    })
}

const sleepUntilReminder = async (context, label, date) => {
    console.log(`Sleeping until ${label} reminder at ${date}`);
    await context.sleepUntil(label, date.toDate());
}

const triggerReminder = async (context, label, subscription) => {

    return await context.run(label,async ()=> {
        console.log(`Triggering ${label} reminder`);

        // send email, sms, push notification ....

        await sendReminderEmail({
            to: subscription.user.email,
            type:label,
            subscription,
        })

    })
}

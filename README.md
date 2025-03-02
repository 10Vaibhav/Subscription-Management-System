# Subscription-Tracker-API

## Overview

Subscription-Tracker-API is a robust backend service designed to help users manage and track their subscriptions. The system provides comprehensive user authentication, subscription lifecycle management, and automated renewal reminders through email notifications. Built with Node.js, Express, and MongoDB, this API also integrates with external services to ensure secure and reliable operation.

## Features

- **User Management**: Complete authentication system with secure signup, signin, and signout
- **Subscription Tracking**: Create, update, view, and delete subscription information
- **Automatic Renewal Calculation**: Smart calculation of next renewal dates based on subscription frequency
- **Reminder System**: Automated email notifications at configurable intervals before renewal dates
- **Security**: JWT-based authentication and request protection through Arcjet
- **Workflow Automation**: Integration with Upstash for scheduling and managing renewal reminders

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Email Service**: Nodemailer
- **Security**: Arcjet for request protection
- **Workflow Management**: Upstash for scheduling reminder tasks

## Workflow

1. **User Authentication**: 
   - Users can sign up, sign in, and sign out using the `/api/v1/auth` endpoints.
   - Authentication is handled using JWT tokens.

2. **Subscription Management**:
   - Users can create, update, delete, and view subscriptions via the `/api/v1/subscriptions` endpoints.
   - Each subscription is linked to a user and includes details like name, price, frequency, and renewal date.

3. **Automated Reminders**:
   - The system uses Upstash Workflow to manage reminders for subscription renewals.
   - When a subscription is created, a workflow is triggered to schedule reminder emails at predefined intervals before the renewal date.

4. **Data Flow**:
   - **Database**: MongoDB is used to store user and subscription data.
   - **Email Notifications**: Nodemailer is configured to send reminder emails to users.
   - **External Services**: Arcjet is used for request protection, and Upstash Workflow manages the scheduling of reminders.

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   DB_URL=mongodb://localhost:27017/subscription-tracker
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   ARCJET_KEY=your_arcjet_key
   QSTASH_URL=your_qstash_url
   QSTASH_TOKEN=your_qstash_token
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
# Web Push Demo Server

This is a simple express server to send Web Push notifications to an enpoint that is passed as a parameter.

## Pre-requisites

1. Install dependencies using `npm install` or `yarn install`
2. Generate the VAPID keys by running `node vapidKeys`
3. Copy and paste the public and private keys in `server.js`

**NOTE:** Make sure the client uses the same public key when subscribing to notifications.

## Execution

Run `node server` to start the server. It will listen for `POST` requests on **port 3000**.

**Path:** /notifications/send

**Request parameters**
* **subscription:** This would be the output of `registration.pushManager.subscribe` in a Service Worker.
* **content:** Object containing text for the push notification
  * title: Title of the notification
  * body: Body of the notification

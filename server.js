const express = require('express'),
      app = express(),
      port = process.env.PORT || 3000,
      bodyParser = require('body-parser'),
      cors = require('cors'),
      webpush = require('web-push');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

/* replace values with output from webpush.generateVAPIDKeys() */
const vapidPublicKey = '';
const vapidPrivateKey = '';
webpush.setVapidDetails('mailto:your-email@here.com', vapidPublicKey, vapidPrivateKey);

app.get('/notifications/send', (req, res, next) => {
    let vapidKeys = webpush.generateVAPIDKeys();
    res.send(JSON.stringify(vapidKeys));
});

app.post('/notifications/send', (req, res, next) => {

    if (req.body.subscription === undefined || req.body.content === undefined) {
        res.status(400).send('Request is missing required data');
        return;
    }

    webpush.sendNotification(req.body.subscription, JSON.stringify(req.body.content))
        .then(() => console.log('Subscription sent to ' + req.body.subscription.endpoint))
        .catch((err) => console.error(err));

    res.status(200).send('Sent notification');
});

app.listen(port);

console.log('Server listening in port ' + port);
const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');


const nexmo = new Nexmo({
  apiKey: '02bafabe',
  apiSecret: 'p9VmPkogQ5Gko9C0',
});

const from = '16672570589';
const to = '12815157556';
const text = 'test';

nexmo.message.sendSms(from, to, text);

// // Init Nexmo
// const nexmo = new Nexmo({
//   apiKey: '02bafabe',
//   apiSecret: 'p9VmPkogQ5Gko9C0',
// }, {debug: true});

// Init app
const app = express();

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public folder setup
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index route
app.get('/', (req, res) => {
    res.render('index');
});

// Catch form submit
app.post('/', (req, res) => {
    const number = req.body.number;
    const text = req.body.text;

    nexmo.message.sendSms(
        '16672570589', number, text, { type: 'unicode' },
        (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                console.dir(responseData);
            }
        }
    );
});

// Define port
const port = 3000;

// Start server
const server = app.listen(port, () => console.log(`server started on port ${port}`));

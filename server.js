#!/bin/env node

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();

var apiApp = function () {

    var self = this;
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        "extended": false
    }));

    app.use(express.static('public'));

    router.get("/", function (req, res) {
        res.json({
            "error": false,
            "message": "Hello World"
        });
    });

    //Test route for get!
    router.route("/test").get(function (req, res) {
        var response = {
            "text": "hello world"
        };
        res.json(response);
    });

    app.use('/', router);

    /**
     *  Start the server (starts up the sample application).
     */
    self.start = function () {
        //  Start the app on the specific interface (and port).
        var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
        var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
        app.listen(port, ipaddress, function () {
            console.log((new Date()) + ' Server is listening on port 8080');
        });
    };

};

var zapp = new apiApp();
zapp.start();
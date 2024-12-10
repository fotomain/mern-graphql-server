
var express = require('express');
var router = express.Router();

// const passport = require('passport');
//

router.route('/ping')
    .get((req, res) => {

        console.log('=== req1 ',req)

        //res.header('Access-Control-Allow-Origin', 'http://localhost:3000');

        if (req.method === "OPTIONS") {
            res.header('Access-Control-Allow-Origin', req.headers.origin);
        } else {
            res.header('Access-Control-Allow-Origin', '*');
        }

        return res.status(200).send(JSON.stringify({
            data: "======= pong already verified"
        }));

        //
        // res.send({
        //     data: "pong"
        // })
    });

module.exports = router;

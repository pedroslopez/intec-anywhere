const express = require('express')
const router = express.Router()
let request = require('request');

const baseUrl = "https://procesos.intec.edu.do/";
const timeout = 1000;

router.post('/:endpoint(*)', (req, response) => {
    if (!req.body || !req.body.auth || 
        !req.body.auth.id || !req.body.auth.password) {
            response.status(401);
            response.send("Please specify credentials.");
            return;
        }

    let auth = {
        txtID: req.body.auth.id,
        txtUserPass: req.body.auth.password
    }

    const jar = request.jar();
    let rqst = request.defaults({jar, baseUrl, timeout});
    
    let method = req.body.method;
    if (method == "POST" || method == "GET") {
        method = method;
    } else {
        return response.send("Please specify a request method.");
    }

    let payload = method == "POST" ? req.body.payload : undefined;

    rqst.post('/', (err, res) => {
        if(!err && res.statusCode == 302) {
            rqst(req.params.endpoint, {
                method,
                json: payload
            }, (err, res, body) => {
                if(err) {
                    console.error(err);
                    response.status(500);
                    return response.send("An error ocurred while processing your request.")
                }
                response.status(res.statusCode);
                response.send(body);
            });
        } else {
            console.error(err);
            response.status(401);
            response.send("CHECK CREDENTIALS");
        }
    }).form(auth);
});

module.exports = router;
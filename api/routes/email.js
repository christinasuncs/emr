const express = require('express');
const router = express.Router();
const axios = require('axios');

// send reminder email
router.post("/reminder", async (req, res) => {
    let data = JSON.stringify({
        "service_id": "service_ig0cejn",
        "template_id": "template_jh5mm8g",
        "user_id": "YLwiiUfhC-PAfy-bz",
        "accessToken": "e6Tq1NHcbt7rO4GG3iEBf",
        "template_params": {
            "to_name": req.body.name,
            "to_email": req.body.email,
            "reply_to": "",
            "message": req.body.message
        }
    });
    
    let config = {
        method: 'post',
        url: 'https://api.emailjs.com/api/v1.0/email/send',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
    };
    
    axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        res.json(response.data);
    })
    .catch(function (err) {
        console.log(err);
        res.status(500).json({err: err.message});
    });
});

module.exports = router;
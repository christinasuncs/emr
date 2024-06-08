const router = require('express').Router();
const axios = require('axios');
const API_URL = "https://health-products.canada.ca/api/";


router.get('/active/id/', async(req, res) => {
    try {
        const id = req.body.id;
        const url = API_URL + "drug/activeingredient/?lang=english&id=" + id;
        console.log(url);
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/x-www-formurlencoded'
            }
        });
        
        if(response.status == 200) {
            console.log(response.data);
            res.json(response.data);

        } else {
            console.log(response.data);
            throw new Error('Login failed. Error code:' + response.status);
        }
        
    } catch(err) {
    
        res.status(500).json({error: err.message});
    }
})

module.exports = router;
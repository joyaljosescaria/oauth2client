// express router
const express = require('express');
const router = express.Router();
const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({clientId: process.env.TWITTER_CONSUMER_KEY, clientSecret: process.env.TWITTER_CONSUMER_SECRET});
const roClient = client.readOnly;

const Users = require('../models/Users.js');

router.get('/twitter' , (req, res) => {
    const { url, codeVerifier, state } = client.generateOAuth2AuthLink(process.env.TWITTER_CALLBACK_URL, { scope: ['tweet.read', 'users.read', 'offline.access'] });
    res.redirect(url);
    console.log(state);
});

router.get('/royal',(req,res)=>{
    res.redirect('http://localhost:3000/private');
});

module.exports = router;
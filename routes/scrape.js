const express = require('express');
const $ = require('cheerio');
const rp = require('request-promise');

const router = express.Router();

const url = 'https://google.com';


router.get('/get', async (req, res) => {
    rp(url)
        .then(async (html) => {
            let urls = [];

            let playersCell = `
                <td class="foo" colspan="2">
                <a href="example.com">
                    <span class="bold">John Beluga</span>
                    - Sarah Jay.
                </a>
                </td>
                `

            for (i = 0; i < 45; i++) {
                let a = $.load(playersCell)
                
                console.log(a('href').html())
            }

            res.send(html);
        })
        .catch((err) => {
            //handle error
            console.log(err.message)
        });

});

module.exports = router;
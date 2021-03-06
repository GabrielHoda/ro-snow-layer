const fetch = require('node-fetch');
const env = require('dotenv');
const schedule = require('node-schedule');
const express = require('express')
const app = express()
const port = process.env.PORT || 5000


env.config();

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


const url = "http://www.meteoromania.ro/images/clima/SZA_orar_interpolat.png"

var k = schedule.scheduleJob('0 5,25,45 * * * *', async function kfunc() {
    await fetch('https://ro-snow-layer.herokuapp.com/');
});

var j = schedule.scheduleJob('0 30 0,6,12,18 * * *',
    async function download() {

        const date_ob = new Date();
        const currentDate = date_ob.toString().slice(4, 24);
        const response = await fetch(url);
        const buffer = await response.buffer();
        // fs.writeFile(`./SnowLayer${currentDate}.jpg`, buffer, () =>
        //     console.log('finished downloading!'));

        const token = 'Bearer ' + process.env.DBX_APP_TOKEN;
        const path = '/snow-layer/Snow Layer Map - ' + currentDate + '.png';

        await fetch('https://content.dropboxapi.com/2/files/upload', {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Dropbox-API-Arg': `{"path": "${path}","mode": "add","autorename": true,"mute": false,"strict_conflict": false}`,
                'Content-Type': 'application/octet-stream'
            },
            body: buffer
        });

        //console.log('file uploaded');
    }
);

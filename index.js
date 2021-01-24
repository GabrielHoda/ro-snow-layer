const fetch = require('node-fetch');
const env = require('dotenv');
const schedule = require('node-schedule');

const url = "http://www.meteoromania.ro/images/clima/SZA_orar_interpolat.png"

var j = schedule.scheduleJob('*/15 * * * * *',
    async function download() {
        env.config();
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

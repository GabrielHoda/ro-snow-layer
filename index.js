const fs = require('fs');
const fetch = require('node-fetch');

const url = "http://www.meteoromania.ro/images/clima/SZA_orar_interpolat.png"

async function download() {
    const date_ob = new Date();
    const currentDate = date_ob.toString().slice(4, 24);
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFile(`./Snow Layer ${currentDate}.jpg`, buffer, () =>
        console.log('finished downloading!'));
}

download();
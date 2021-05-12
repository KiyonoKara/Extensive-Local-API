import * as http from "http";

const body = {
    message: Buffer.from("Message to server", 'utf-8').toString('base64')
};

const request = http.request({
    hostname: "localhost",
    port: 8080,
    method: "POST",
    path: "/base64"
}, callback => {
    let body = [] as Buffer[];
    callback.on('data', chunk => body.push(chunk));
    callback.on('end', () => console.log(Buffer.concat(body).toString()));
});

request.write(Buffer.from(JSON.stringify(body)));
request.end();

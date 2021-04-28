import * as http from "http";

const request = http.request({
    hostname: "localhost",
    port: 8080,
    method: "GET",
    path: "/echo"
}, callback => {
    let body = [] as Buffer[];
    callback.on('data', chunk => body.push(chunk));
    callback.on('end', () => console.log(Buffer.concat(body).toString()));
});

request.end();

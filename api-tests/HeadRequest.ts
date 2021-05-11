import * as http from "http";

const request = http.request({
    hostname: "localhost",
    port: 8080,
    method: "HEAD",
    path: "/echo"
}, callback => {
    let body = [] as Buffer[];
    callback.on('data', chunk => body.push(chunk));
    callback.on('end', () => console.log(Buffer.concat(body).toString()));
});

console.log(request.getHeaders());

request.end();

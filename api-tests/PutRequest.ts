import * as http from "http";

const body = {
    message: "Message to server"
};

const request = http.request({
    hostname: "localhost",
    port: 8080,
    method: "PUT",
    path: "/echo"
}, callback => {
    let body = [] as Buffer[];
    callback.on('data', chunk => body.push(chunk));
    callback.on('end', () => console.log(Buffer.concat(body).toString()));
});

request.write(Buffer.from(JSON.stringify(body)));
request.end();

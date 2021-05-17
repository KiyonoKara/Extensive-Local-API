import * as http from "http";
import * as Specifications from "../src/util/constants/Specifications";

const body = {
    payload: {
        message: "This is a payload with more data",
        date: Specifications.CURRENT_DATE,
        list: [
            1,
            2,
            3,
            4
        ],
        map: [
            {
                1: "One"
            },
            {
                2: "Two"
            }
        ]

    }
};

const request = http.request({
    hostname: "localhost",
    port: 8080,
    method: "POST",
    path: "/payload"
}, callback => {
    let body = [] as Buffer[];
    callback.on('data', chunk => body.push(chunk));
    callback.on('end', () => console.log(Buffer.concat(body).toString()));
});

request.write(Buffer.from(JSON.stringify(body)));
request.end();

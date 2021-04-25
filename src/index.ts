import * as http from "http";
import { setHeaders } from "./util/Headers";
import "./util/StringFabrication";

const port: number = 8080;

const server: http.Server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
    if (request.url === "/") {
        setHeaders(response,
            {
                "content-type": "text/plain; charset=utf-8",
                "date": new Date().toUTCString()
            }
        );

        response.writeHead(response.statusCode, response.statusMessage);
        response.end(({ status: 200, message: "OK" }).stringify(), 'utf-8');
    }
});

server.listen(port, () => {
    console.log(`Local server listening on port ${port}`);
    console.log(`Local server URL: http://localhost:${port}`);
});

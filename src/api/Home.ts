import { setHeaders } from "../util/Headers";
import { STATUS_OK } from "../util/constants/StatusPayloads";
import "../util/StringFabrication";

export const run = (request, response, options) => {
    console.log(options);
    if (request.url === "/") {
        setHeaders(response,
            {
                "content-type": "application/json; charset=utf-8",
                "date": new Date().toUTCString()
            });
        response.writeHead(response.statusCode, response.statusMessage);
        response.end(STATUS_OK.stringify(), 'utf-8');
    }
};

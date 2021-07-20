import * as HandleMethods from "../server/handlers/HandleMethods";
import * as Methods from "../util/constants/Methods";
import { KeyObject } from "../util/Interfaces";

export const run = (request, response, options) => {
    if (options.path === "/echo") {
        if (request.headers['x-http-method-override'] === options['utilities']['Constants']['Methods'].PATCH) request.method = request.headers['x-http-method-override'] as string;

        if (request.method === Methods.POST || request.method === Methods.PUT || request.method === Methods.PATCH) {
            HandleMethods.writtenBody(request, response, request.method, { isJSON: true }).then(data => {
                if (data['message']) {
                    HandleMethods.sendWrittenOutput(request, response, request.method, { data: { success: `${request.method} request was successful.`, message: data['message'] }, isJSON: true });
                }
            });
        } else if (request.method === Methods.HEAD || request.method === Methods.OPTIONS) {
            let headers: KeyObject = {};
            let count = 0;
            let tempArray = [];
            for (let i in response['req'].rawHeaders) {
                if (response['req'].rawHeaders.hasOwnProperty(i)) {
                    count += 1;
                    tempArray.push(response['req'].rawHeaders[i]);
                }
                if (count === 2) {
                    count = 0;
                    headers[tempArray[0]] = tempArray[1] ?? null;
                }
            }
            headers["Content-Type"] = "text/plain";

            HandleMethods.handleHEAD(request, response, request.method, { headers: headers });
        } else {
            HandleMethods.handleMethod(request, response, request.method, { data: { success: `${request.method} request was successful.` }, isJSON: true });
        }
    }
}

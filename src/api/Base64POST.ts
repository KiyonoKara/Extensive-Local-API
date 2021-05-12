import * as HandleMethods from "../server/handlers/HandleMethods";
import * as Methods from "../util/constants/Methods";
import * as crypto from "crypto";

export const run = (request, response, options) => {
    if (options.path === "/base64") {
        if (request.method === Methods.POST) {
            HandleMethods.writtenBody(request, response, request.method, { isJSON: true }).then(data => {
                if (data['message']) {
                    data['message'] = Buffer.from(data['message'].toString(), "base64").toString('utf-8');
                    HandleMethods.sendWrittenOutput(request, response, request.method, { data: { success: `${request.method} request was successful.`, message: data['message'] }, isJSON: true });
                }
            });
        } else {
            HandleMethods.handleGET(request, response, request.method, { data: { front: `Send a POST request to successfully use this endpoint.` }, isJSON: true })
        }
    }
}

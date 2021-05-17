import * as HandleMethods from "../server/handlers/HandleMethods";
import * as Methods from "../util/constants/Methods";

export const run = (request, response, options) => {
    if (options.path === "/payload") {
        if (request.method === Methods.POST) {
            HandleMethods.writtenBody(request, response, request.method, { isJSON: true }).then(data => {
                if (data['payload'] && JSON.parse(JSON.stringify('payload'))) {
                    HandleMethods.sendWrittenOutput(request, response, request.method, { data: { success: `${request.method} request was successful.`, payload: data['payload'] }, isJSON: true });
                }
            });
        } else {
            HandleMethods.handleGET(request, response, request.method, { data: { front: `Send a POST request to successfully use this endpoint.` }, isJSON: true })
        }
    }
}

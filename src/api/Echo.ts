import * as HandleMethods from "../server/handlers/HandleMethods";
import * as Methods from "../util/constants/Methods";

export const run = (request, response, options) => {
    if (options.path === "/echo") {
        if (request.method === Methods.POST || request.method === Methods.PUT || request.method === Methods.PATCH) {
            HandleMethods.writtenBody(request, response, request.method, { isJSON: true }).then(data => {
                if (data['message']) {
                    HandleMethods.sendWrittenOutput(request, response, request.method, { data: { success: `${request.method} request was successful.`, message: data['message'] }, isJSON: true });
                }
            });
        } else {
            HandleMethods.handleMethod(request, response, request.method, { data: { success: `${request.method} request was successful.` }, isJSON: true });
        }
    }
}

import * as HandleMethods from "../server/handlers/HandleMethods";
import * as Methods from "../util/constants/Methods";
import { setHeaders } from "../util/Headers";
import { Constants } from "../util/IndexUtil";

export const run = (request, response, options) => {
    if (options.path === "/echo") {
        setHeaders(response,
            {
                "Allow": `${Methods.GET}, ${Methods.POST}, ${Methods.DELETE}, ${Methods.PUT}, ${Methods.PATCH}, ${Methods.HEAD}`,
                "date": Constants.Specifications.CURRENT_DATE
            });
        if (request.method === Methods.POST || request.method === Methods.PUT || request.method === Methods.PATCH) {
            HandleMethods.writtenBody(request, response, request.method, { isJSON: true }).then(data => {
                if (data['message']) {
                    HandleMethods.sendWrittenOutput(request, response, request.method, { data: { success: `${request.method} request was successful.`, message: data['message'] }, isJSON: true });
                }
            });
        } else if(request.method === "HEAD") {
            HandleMethods.handleHEAD(request, response, request.method);
        } else {
            HandleMethods.handleMethod(request, response, request.method, { data: { success: `${request.method} request was successful.` }, isJSON: true });
        }
    }
}

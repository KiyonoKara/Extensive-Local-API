import * as HandleMethods from "../server/handlers/HandleMethods";

export const run = (request, response, options) => {
    if (options.path === "/echo") {
        HandleMethods.handleGET(request, response, "GET", { data: { success: "Request was successful" }});
    }
}

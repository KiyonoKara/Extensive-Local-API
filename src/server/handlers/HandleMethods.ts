import * as http from "http";
import { Methods, Specifications } from "../../util/constants/IndexConstants";
import "../../util/StringFabrication";
import { DataOptions } from "../../util/Interfaces";

export const handleGET = function(request: http.IncomingMessage, response: http.ServerResponse, method: string = "GET", options: Partial<DataOptions> = {}) {
    if (method !== Methods.GET) return;
    response.writeHead(200, { "Content-Type": Specifications.APPLICATION_JSON_CT });
    if (options.data) {
        return response.end(options.data.stringify());
    }
}

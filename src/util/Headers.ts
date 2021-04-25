import * as http from "http";
import { noop } from "./constants/Functions";

export const setHeaders: Function = function(response: http.ServerResponse, headers: object) {
    for (let key in headers) {
        if (headers.hasOwnProperty(key)) {
            try {
                response.setHeader(key, headers[key]);
            } catch {
                noop();
            }
        }
    }
}

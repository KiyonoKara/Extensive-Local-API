import http from "http";
import {DataOptions} from "../src/util/Interfaces";
import {Methods} from "../src/util/constants/IndexConstants";
import "../src/util/StringFabrication";

/** Code that is no longer being used but may still be important */
export const openPOSTBody = function(request: http.IncomingMessage, response: http.ServerResponse, method: string = "POST", options: Partial<DataOptions> = {}) {
    if (method !== Methods.POST) return;
    let incomingBody = [] as Buffer[];
    request.on('data', chunk => incomingBody.push(chunk));
    return new Promise((resolve, reject) => {
        request.on('end', () => {
            if (incomingBody.length > 1e7) {
                return response.end({ error: http.STATUS_CODES[413] }.stringify());
            }
            const str = Buffer.concat(incomingBody).toString();
            if (options.isJSON) {
                try {
                    resolve(JSON.parse(str));
                } catch {
                    resolve(str);
                }
            } else {
                resolve(str);
            }
        });
        request.on('error', error => reject({ error: error }));
    });
};

import * as http from "http";
import { Methods, Specifications } from "../../util/constants/IndexConstants";
import "../../util/StringFabrication";
import { DataOptions } from "../../util/Interfaces";

export const handleMethod = function(request: http.IncomingMessage, response: http.ServerResponse, method: string = "GET", options: Partial<DataOptions> = {}) {
    const finalMethod = method.toUpperCase();
    if (Methods[finalMethod] && methodHandlers[finalMethod]) methodHandlers[finalMethod](request, response, Methods[finalMethod], options);
};

export const defaultHandler = function(request: http.IncomingMessage, response: http.ServerResponse, options: Partial<DataOptions> = {}) {
    response.writeHead(200, { "Content-Type": Specifications.APPLICATION_JSON_CT });
    return response.end((options?.data ?? { message: `${request.method} request was successful.` }).stringify());
};

export const handleGET = function(request: http.IncomingMessage, response: http.ServerResponse, method: string = "GET", options: Partial<DataOptions> = {}) {
    if (method !== Methods.GET) return;
    return defaultHandler(request, response, options);
};

export const sendWrittenOutput = function(request: http.IncomingMessage, response: http.ServerResponse, method: string = "POST", options: Partial<DataOptions> = {}) {
    response.writeHead(200, { "Content-Type": Specifications.APPLICATION_JSON_CT });
    if (method === Methods.POST || method === Methods.PUT || method === Methods.PATCH) {
        if (options.data) {
            return response.end(options.data.stringify());
        }
    }
}

export const handlePOST = function(request: http.IncomingMessage, response: http.ServerResponse, method: string = "POST", options: Partial<DataOptions> = {}) {
  if (method !== Methods.POST) return;
  response.writeHead(200, { "Content-Type": Specifications.APPLICATION_JSON_CT });

  let incomingBody = [] as Buffer[];

  request.on('data', chunk => incomingBody += chunk);
  request.on('end', () => {
      if (incomingBody.length > 1e7) {
          return response.end({ error: http.STATUS_CODES[413] }.stringify());
      }
      const str = Buffer.concat(incomingBody).toString();
      let json;
      if (options.isJSON) {
          try {
              json = JSON.parse(str);
              return response.end((options.data ?? json).stringify());
          } catch {
              return response.end({ error: http.STATUS_CODES[400] }.stringify());
          }
      } else {
          return response.end((options.data.stringify() ?? { 200: "OK" }.stringify()));
      }
  });
};

export const writtenBody = function(request: http.IncomingMessage, response: http.ServerResponse, method: string = "POST", options: Partial<DataOptions> = {}) {
    if (method !== Methods.POST && method !== Methods.PUT && method !== Methods.PATCH) return;
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

export const handleDELETE = function(request: http.IncomingMessage, response: http.ServerResponse, method: string = "DELETE", options: Partial<DataOptions> = {}) {
    if (method !== Methods.DELETE) return;
    return defaultHandler(request, response, options);
}

export const handleHEAD = function(request: http.IncomingMessage, response: http.ServerResponse, method: string = "HEAD", options: Partial<DataOptions> = {}) {
    if (method !== Methods.HEAD) return;
    return defaultHandler(request, response, options);
};

const methodHandlers = {
    GET: handleGET,
    POST: handlePOST,
    DELETE: handleDELETE,
    HEAD: handleHEAD
};

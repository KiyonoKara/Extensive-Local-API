import * as http from "http";
import { handle } from "./handlers/PassRequests";
import "../util/StringFabrication";

export const server: http.Server = http.createServer((request: http.IncomingMessage, response: http.ServerResponse) => {
    handle(request, response);
});

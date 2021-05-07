import * as crypto from "crypto";
import { setHeaders } from "../util/Headers";
import { Constants } from "../util/IndexUtil";

export const run = (request, response, options) => {
    if (request.url === "/ro") {
        setHeaders(response,
            {
                "content-type": Constants.Specifications.APPLICATION_JSON_CT,
                "date": Constants.Specifications.CURRENT_DATE
            });
        response.writeHead(response.statusCode, response.statusMessage);

        const ROPayload = {
            status: "200",
            message: "OK",
            data: {
                date: Constants.Specifications.CURRENT_DATE,
                sha: crypto.createHash("sha1").digest("base64"),
                session: crypto.randomBytes(16).toString("hex")
            }
        };
        response.end(ROPayload.stringify(), 'utf-8');
    }
};

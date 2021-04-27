import { setHeaders } from "../util/Headers";
import { Constants } from "../util/IndexUtil";

export const run = (request, response, options) => {
    if (request.url === "/") {
        setHeaders(response,
            {
                "content-type": Constants.Specifications.APPLICATION_JSON_CT,
                "date": Constants.Specifications.CURRENT_DATE
            });
        response.writeHead(response.statusCode, response.statusMessage);
        response.end(Constants.StatusPayloads.STATUS_OK.stringify(), 'utf-8');
    }
};

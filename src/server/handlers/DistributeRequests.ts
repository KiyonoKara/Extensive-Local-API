import * as fs from "fs";
import { API } from "./API";
import * as Utilities from "../../util/IndexUtil";
import { KeyObject } from "../../util/Interfaces";
import { setHeaders } from "../../util/Headers";
import * as Methods from "../../util/constants/Methods";
import * as Specifications from "../../util/constants/Specifications";

export const distribute = (request, response, options: KeyObject = {}) => {
    // Setting options just in case
    options.utilities = Utilities;
    // Setting default headers
    setHeaders(response,
        {
            "allow": `${Methods.GET}, ${Methods.POST}, ${Methods.DELETE}, ${Methods.PUT}, ${Methods.PATCH}, ${Methods.HEAD}`,
            "date": Specifications.CURRENT_DATE,
            "cache-control": Specifications.NO_CACHE,
            "content-encoding": `${Specifications.BR}`
        });

    fs.readdirSync('src/api')
        .forEach(file => {
            if (file.endsWith(".ts")) {
                const component: string = file.split('.').slice(0, -1).join('.');
                const path: string = request.url.endsWith("/") && request.url !== "/" ? request?.url.slice(0, -1) : request.url;
                options.path = path;
                if (API[component] && path === API[component]?.path.toLowerCase()) {
                    API[component]?.main?.run(request, response, options ? options : {});
                }
            }
    });
};

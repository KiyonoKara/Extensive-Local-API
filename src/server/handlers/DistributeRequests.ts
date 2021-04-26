import * as fs from "fs";
import { API } from "./API";

export const distribute = (request, response, options?) => {
    fs.readdirSync('src/api')
        .forEach(file => {
            if (file.endsWith(".ts")) {
                const component: string = file.split('.').slice(0, -1).join('.');
                if (API[component] && request.url.toLowerCase() === API[component]?.path.toLowerCase()) {
                    API[component]?.main?.run(request, response, options ? options : {});
                }
            }
    });
};

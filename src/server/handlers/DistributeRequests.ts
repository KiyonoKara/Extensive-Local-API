import * as fs from "fs";
import { API } from "./API";

export const distribute = (request, response, options?) => {
    fs.readdirSync('src/api')
        .forEach(file => {
            if (file.endsWith(".ts")) {
                const component: string = file.split('.').slice(0, -1).join('.');
                API[component]?.run(request, response, options ? options : {});
            }
    });
};

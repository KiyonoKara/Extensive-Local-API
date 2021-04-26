import { distribute } from "./DistributeRequests";

export const handle = (request, response, options?) => {
    distribute(request, response, options)
};

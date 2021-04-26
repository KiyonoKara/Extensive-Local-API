import { distribute } from "./DistributeRequests";
import { KeyObject } from "../../util/Interfaces";

export const handle = (request, response, options?: KeyObject) => {
    distribute(request, response, options)
};

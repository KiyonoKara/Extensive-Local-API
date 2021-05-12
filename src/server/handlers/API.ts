import * as Home from "../../api/Home";
import * as Echo from "../../api/Echo";
import * as ReadOnly from "../../api/ReadOnly";
import * as Base64POST from "../../api/Base64POST";

export const API = {
    Home: {
        main: Home,
        path: "/"
    },
    Echo: {
        main: Echo,
        path: "/echo"
    },
    ReadOnly: {
        main: ReadOnly,
        path: "/ro"
    },
    Base64POST: {
        main: Base64POST,
        path: "/base64"
    }
};

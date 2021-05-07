import * as Home from "../../api/Home";
import * as Echo from "../../api/Echo";
import * as ReadOnly from "../../api/ReadOnly";

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
    }
};

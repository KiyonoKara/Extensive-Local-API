import * as Home from "../../api/Home";
import * as Echo from "../../api/Echo";

export const API = {
    Home: {
        main: Home,
        path: "/"
    },
    Echo: {
        main: Echo,
        path: "/echo"
    }
};

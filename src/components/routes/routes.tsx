import Movies from "./Movies";
import Movie from "../Movie";
import LoginAndSignUp from "./LoginAndSignUpComponent";
import CompletedWatchList from "./CompletedWatchList";
import ToWatchList from "./ToWatchList";
import Error from "./Error";
import App from "../../App";

const routes = [
    {
        path: "/",
        element: <App />,
        errorComponent: Error,
        children: [
            {
                index: true,
                element: <Movies />,
                errorComponent: Error,
            },
            {
                path: "/login",
                element: <LoginAndSignUp />,
                errorComponent: Error,
            },
            {
                path: "/signup",
                element: <LoginAndSignUp />,
                errorComponent: Error,
            },
            {
                path: "/completedwatchlist",
                element: <CompletedWatchList />,
                errorComponent: Error,
            },
            {
                path: "/toWatchList",
                element: <ToWatchList />,
                errorComponent: Error,
            },
            {
                path: "/movie/:id",
                element: <Movie />,
                errorComponent: Error,
            },
        ]
    }

];

export default routes;
import { NavLink } from "react-router-dom"
import { APIContext } from "./APIContextProvider"
import { useContext } from "react"

export default function NavBar() {
    const { apiKey, setApiKey } = useContext(APIContext);
    return (
        <nav className="navbar">

            <div className="navbar__logo">
                <p>MovieVault</p>
            </div>

            <div className="navbar__menu">

                <NavLink to={"/"}>Movies</NavLink>
                <NavLink to={"/towatchlist"}>Movie-To Watch List</NavLink>
                <NavLink to={"/completedwatchlist"}>Movie-Completed Watch List</NavLink>

            </div>
            {/* <div className="loginSignUp">
                    <NavLink to={"/login"}>Login</NavLink>
                </div>} */}
            {!apiKey && (
                <>
                    <div className="loginSignUp">
                        <NavLink to={"/login"}>Login</NavLink>
                    </div>
                </>
            )}



        </nav >
    )

}
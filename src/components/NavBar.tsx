import { NavLink } from "react-router-dom"

export default function NavBar() {
    return (
        <nav className="navbar">

            <div className="navbar__logo">
                <p>MovieVault</p>
            </div>

            <div className="navbar__menu">

                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/towatchlist"}>Movie-To Watch List</NavLink>
                <NavLink to={"/completedwatchlist"}>Movie-Completed Watch List</NavLink>

            </div>
            {/* 
            <div className="loginSignUp">
                <NavLink to={"/login"}>Login</NavLink>
            </div> */}

        </nav >
    )

}
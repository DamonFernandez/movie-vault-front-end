export default function NavBar() {
    return (
        <nav className="navbar">

            <div className="navbar__logo">
                <p>MovieVault</p>
            </div>

            <div className="navbar__menu">
                <ul>
                    <li>Home</li>
                    <li>Movies</li>
                    <li>Movie-To Watch List</li>
                    <li>Movie-Completed Watch List</li>
                </ul>
            </div>

            <div className="loginSignUp">
                <button>Login</button>
                <button>Sign Up</button>
            </div>

        </nav >
    )

}
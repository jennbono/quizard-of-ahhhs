import React from "react";


const Navbar = () =>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/home">Quizard of Ahhhs...</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className={window.location.pathname === "/" ||
                    window.location.pathname === "/home"
                    ? "active"
                    : ""}>
                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                </li>
            </ul>
        </div>
            <button type="button" className="btn btn-success">
                Sign Up
            </button>
            <button type="button" className="btn btn-success">
                Log In
            </button>
    </nav>


export default Navbar;
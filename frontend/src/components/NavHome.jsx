import React from "react"



export const NavHome = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark p-1">
            <div className="container-fluid">
                <a className="navbar-brand d-inline-block p-0" href="#" style={{ width: "150px" }}>
                    <img
                        src="/image-removebg-preview.png"
                        alt="Logo"
                        className="img-fluid"
                        style={{ width: "100px", height: "auto" }}
                    />
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end pe-3" id="navbarNav">
                    <ul className="navbar-nav fs-3 gap-3 ms-5 me-5">
                        <li className="nav-item">
                            <a className="nav-link active  text-light" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-light" href="#">Pricing</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )

}
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
    const navigate = useNavigate()

    function handleLogout() {
        // Remove userId from localStorage

        localStorage.removeItem('userId');
        // Navigate to the '/' page
        navigate('/');
    }

    return (
        <>
            <nav className="navbar navbar-dark bg-dark ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/" style={{ fontFamily: "cursive", fontSize: "1.5rem", color: "#e0ac1c" }}>React Bill Management App</a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                </div>
            </nav>
            {/* offcanvas */}
            <div className="offcanvas offcanvas-start" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>

                <div className="offcanvas-body">



                    <button className="btn btn-secondary w-100 my-2 mx-auto" type="button" >
                        <Link to="/bill" className="p-2 mb-1 mb-sm-2 sdb "
                            aria-current="true">

                            <span className='text-sdb text-light' >
                                Bill Generator
                            </span>
                        </Link>
                    </button>
                    <button className="btn btn-secondary w-100 my-2 mx-auto" type="button" >
                        <Link to="/customer-List" className="p-2 mb-1 mb-sm-2 sdb "
                            aria-current="true">

                            <span className='text-sdb text-light' >
                                Customer List
                            </span>
                        </Link>
                    </button>
                    <button className="btn btn-secondary w-100 my-2 mx-auto" type="button" onClick={handleLogout}>
                        <span className='text-sdb text-light' >
                            Logout
                        </span>
                    </button>

                </div>
            </div>

        </ >
    )
}

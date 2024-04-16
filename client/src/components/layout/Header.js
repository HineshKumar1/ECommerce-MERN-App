import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { toast } from "react-toastify";
import SearchInput from "../Form/SearchInput";
function Header() {
  const [auth, setAuth] = useAuth();
  // const Navigate = useNavigate();
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    toast.success("Logout Successfully!");

  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            🛒 Order Good{" "}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <SearchInput/>
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/contact">
                  Category
                </NavLink>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      SignUp
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  {" "}
                  <li className="nav-item">
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {auth?.user?.name}
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                        <NavLink
                          to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            onClick={handleLogout}
                            to="/login"
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/*">
                  Card
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;

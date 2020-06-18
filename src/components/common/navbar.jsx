import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ items }) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Link className="navbar-brand" to="./">
          My React App
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="navbar-nav">
            {items.map((i) => (
              <NavLink key={i.path} className="nav-item nav-link" to={i.path}>
                {i.item}
              </NavLink>
            ))}
          </div>
        </div>
        <Link className="navbar-brand" to="./login">
          <i className="fa fa-user-circle-o" aria-hidden="true">
            <span className="m-2">Login</span>
          </i>
        </Link>
      </nav>
    </React.Fragment>
  );
};

export default NavBar;

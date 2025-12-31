import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4 sticky-top">
      <div className="container-fluid">

        {/* BRAND */}
        <div className="d-flex align-items-center">
          <img src={logo} alt="Bells University Logo" className="logo" />

          <div className="ms-2 lh-sm">
            <div className="fw-semibold text-dark">
              Bells University of Technology
            </div>
            <div className="text-muted small">
              New Horizons ICT
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="d-flex gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'nav-link active-link' : 'nav-link'
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/post"
            className={({ isActive }) =>
              isActive ? 'nav-link active-link' : 'nav-link'
            }
          >
            Post Announcement
          </NavLink>
        </div>

      </div>
    </nav>
  );
}

export default Header;

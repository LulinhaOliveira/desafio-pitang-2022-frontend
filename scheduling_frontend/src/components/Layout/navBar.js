import { Link } from "react-router-dom";
import "./navBar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="list">
        <li className="item">
          <Link to="/">List</Link>
        </li>
        <li className="item">
          <Link to="/create">Create</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

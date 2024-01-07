import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="container flex justify-between bg-neutral-900 rounded-2xl">
        <ul className="flex gap-4 text-white">
          <li>
            <NavLink to="/">Portfolio</NavLink>
          </li>
          <li>
            <NavLink to="/wallets">Wallets</NavLink>
          </li>
        </ul>
        <div>
          <Link to="/logout">
            <i className="fa-solid fa-arrow-right-from-bracket text-white cursor-pointer"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

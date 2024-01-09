import { NavLink, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="container flex justify-between bg-neutral-900 rounded-2xl text-white">
        <ul className="flex gap-4">
          <li>
            <NavLink to="/">Portfolio</NavLink>
          </li>
          <li>
            <NavLink to="wallets">Wallets</NavLink>
          </li>
        </ul>
        <div>
          <Link to="logout">
            <i className="fa-solid fa-arrow-right-from-bracket cursor-pointer"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

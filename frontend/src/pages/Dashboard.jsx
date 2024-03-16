import NavBar from "../components/NavBar.jsx";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="py-8 px-5 flex flex-col gap-4 sm:text-xl">
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
